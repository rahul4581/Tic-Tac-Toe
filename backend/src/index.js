import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import {DB_NAME} from "./constant.js"
import connectDB from "./db/index.js"
import {server} from "./app.js"

dotenv.config({path: "./env"})


connectDB()
.then( () =>{
    const PORT=process.env.PORT
    server.listen(PORT,()=>{
        console.log("server is connected");
    })
})
.catch((error) =>{
    console.log("MONGOdb connection failed ERROR:",error)
})



/*
const app=express();
;(async () =>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

       app.listen(process.env.PORT,() =>{
        console.log("server is running......");
       })
    }catch (error){
        console.log("Error:",error);
    }
})*/