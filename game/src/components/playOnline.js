import {useState,useEffect} from "react"
import {io} from "socket.io-client"
import "./css_files/computer.css"
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { NavLink,Navigate  } from "react-router-dom";
import { MdOutlineHelpOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";

const socket = io("http://localhost:5000", {
    autoConnect: false,
    transports: ["websocket"], 
    reconnection: true,
    reconnectionAttempts: 5, 
    reconnectionDelay: 1000,
});


function PlayOnline(){
    const [you, setYou] = useState("c5");
    const [comp, setComp] = useState("c3");
    const [room,setRoom]=useState("")
    const [playerSymbol,setPlayerSymbol]=useState("")
    const [board,setBoard]=useState([0,0,0,0,0,0,0,0,0])
    const [wait,setWait]=useState(false)
    const [tdClass,setTdClass]=useState(["","","","","","","","",""])
    const [finish,setFinish]=useState(false);
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    function mark(index,symbol ) {
        setTdClass(prevClass =>{
            const updateTdClass=[...prevClass]
            symbol==="X"?updateTdClass[index]="wrong":updateTdClass[index]="circle"
            console.log(updateTdClass)
            return updateTdClass
        })
    }
    function returnToHome(){
        setFinish(true)
    }
    const checkWinnner=(board,symbol) =>{
        for(let i=0;i<winningCombinations.length;i++){
            if(board[winningCombinations[i][0]]==symbol && board[winningCombinations[i][1]]==symbol && board[winningCombinations[i][2]]==symbol){
                return true;
            }
        }
        return false;
    }
    useEffect(() => {
        socket.connect();
    
        socket.on("connect", () => {
            socket.emit("joinGame");
        });
    
        socket.on("disconnect", (reason) => {
            console.error("Socket disconnected! Reason:", reason);
        });
    
        socket.on("waiting", () => setWait(true));
    
        socket.on("enter", ({ room, player1, player2 }) => {
            console.log("Entering game...", room, player1, player2);
            setWait(false);
            setRoom(room);
            setPlayerSymbol(player1 === socket.id ? "X" : "O");
        });
    
        socket.on("gameStart", ({ room, player1, player2 }) => {
            setRoom(room);
            setPlayerSymbol(player1 === socket.id ? "X" : "O");
        });
    
        socket.on("updateBoard", ({ index, symbol }) => {
            console.log("update board recieved")
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[index] = symbol;
                console.log(newBoard)
                console.log( "winning check :", checkWinnner(newBoard,symbol))
                if (checkWinnner(newBoard,symbol)) {
                    alert(symbol === "X" ? "Player 1 Won" : "Player 2 Won");
                    socket.disconnect();
                    console.log("disconnected");
                    returnToHome();
                }
                return newBoard;
            });
            mark(index, symbol);
        });
    
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("waiting");
            socket.off("enter");
            socket.off("gameStart");
            socket.off("updateBoard");
        };
    }, []);
    
    const handleClick = (index) => {
        console.log(`Clicked cell: ${index}, Room: ${room}, Player: ${playerSymbol}`);
    
        if (!socket || !socket.connected) {
            console.error("Socket is NOT connected!");
            return;
        }
    
        console.log("Emitting move event...");
        socket.emit("move", { room, index, symbol: playerSymbol });
    };
    
    if(wait){
        return(
            <div className="wait_1">
                werfgb
            </div>
        )
    }
    if(finish){
        return(
            <Navigate to="/"/>
        )
    }
    return(
        <div className="full-height">
            <div className="c1">
                <div className="c2">
                    <div>
                        <NavLink to="/">
                            <IoMdHome className="icon1" />
                        </NavLink>
                    </div>
                    <div>
                        <MdOutlineHelpOutline className="icon2" />
                    </div>
                </div>
                <div className={comp}>
                        <div className="c3_2">Computer</div>
                        <div className="c3_1">
                            <ImCross className="icon3" />
                        </div>
                </div>
                <div className="c4">
                    <table>
                        <tr>
                            <td id="1" className={tdClass[0]} onClick={() =>handleClick(0)} ></td>
                            <td id="2" className={tdClass[1]} onClick={() =>handleClick(1)}></td>
                            <td id="3" className={tdClass[2]} onClick={() =>handleClick(2)} ></td>
                        </tr>
                        <tr>
                            <td id="4" className={tdClass[3]} onClick={() =>handleClick(3)} ></td>
                            <td id="5" className={tdClass[4]} onClick={() =>handleClick(4)} ></td>
                            <td id="6" className={tdClass[5]} onClick={() =>handleClick(5)} ></td>
                        </tr>
                        <tr>
                            <td id="7" className={tdClass[6]} onClick={() =>handleClick(6)} ></td>
                            <td id="8" className={tdClass[7]} onClick={() =>handleClick(7)} ></td>
                            <td id="9" className={tdClass[8]} onClick={() =>handleClick(8)} ></td>
                        </tr>
                    </table>
                </div>
                <div className={you}>
                    <div className="c5_2">You</div>
                    <div className="c5_1">
                        <FaRegCircle className="icon4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayOnline