
import mongoose from "mongoose"
import {DB_NAME} from "../constant.js";
const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL+"/"+DB_NAME)
        console.log("Connected to DB",conn.connection.host,conn.connection.name)
    }catch (error){
        console.log("ERROR:",error)
    }
}

export default connectDB;