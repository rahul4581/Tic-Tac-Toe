import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import {Server} from "socket.io"

const app=express()
app.use(cors())
const server =http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN,
        methods:["GET","POST"],
        credentials:true
    }
})
//socket io
let waitingPlayers = [];
let playersInGame = new Set();

io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("joinGame", () => {
        console.log(`Player ${socket.id} requested to join`);

        if (playersInGame.has(socket.id)) {
            console.log(`Player ${socket.id} is already in a game. Ignoring join request.`);
            return;
        }

        if (!waitingPlayers.includes(socket.id)) {
            waitingPlayers.push(socket.id);
            console.log(`User added to waiting list: ${waitingPlayers}`);

            if (waitingPlayers.length >= 2) {
                console.log(`Game starting with players: ${waitingPlayers}`);

                const [player1, player2] = waitingPlayers.splice(0, 2);
                console.log(`Matched players: ${player1} vs ${player2}`);
                console.log(`Waiting list after removal: ${waitingPlayers}`);

                const room = `room-${player1}-${player2}`;

                playersInGame.add(player1);
                playersInGame.add(player2);
                console.log(`Active game players: ${[...playersInGame]}`);

                io.sockets.sockets.get(player1)?.join(room);
                io.sockets.sockets.get(player2)?.join(room);
                console.log(`Players joined room: ${room}`);

                io.to(room).emit("enter", { room, player1, player2 });
                io.to(room).emit("gameStart", { room, player1, player2 });
            } else {
                console.log("Waiting for another player...");
                socket.emit("waiting");
            }
        }
    });

    socket.on("move", ({ room, index, symbol }) => {
        console.log(`Move received: Room: ${room}, Index: ${index}, Symbol: ${symbol}`);
        io.to(room).emit("updateBoard", { index, symbol });
    });

    socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);

        waitingPlayers = waitingPlayers.filter(player => player !== socket.id);
        console.log(`Updated waiting list: ${waitingPlayers}`);

        playersInGame.delete(socket.id);
        console.log(`Removed ${socket.id} from active games. Remaining: ${[...playersInGame]}`);
    });
});


//configuration of server
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json({
    limit:"15kb"
}))//used to get data from forms in json format
app.use(express.urlencoded({extended:true,limit:"15kb"}))//used to get data from urls
app.use(express.static("public"))//used to store pdf's or other sorts of data in server
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Server is running!');
});

//import routes
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user",userRouter)


export {server}