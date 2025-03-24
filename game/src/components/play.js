import "./css_files/play.css"
import {Navigate} from "react-router-dom";
import {useState} from "react";
import { CiGlobe } from "react-icons/ci";
import { RiComputerLine } from "react-icons/ri";
import {useEffect} from "react"
import {useStore} from "../zustore/store.js";

function Play(){
    const {CheckAuth}=useStore();
    const [com,setCom]=useState(false);
    const [onl,setOnl]=useState(false);
    const play=require("./images/play.jpg");
    useEffect(()=>{
        CheckAuth();
    },[])
    if(com){
        return <Navigate to="/computer"/>
    }else if(onl){
        return <Navigate to="/playOnline"/>
    }
    return(
        <div className="p1">
            <div> <img src={play} alt="play"/></div>
            <div className="p2"><input type="button" value="Computer" onClick={()=>{setCom(!com)}}/></div>
            <div className="p2"><input type="button" value="Play Online" onClick={() =>{setOnl(!onl)}}/></div>
        </div>
    );
}
export default Play;