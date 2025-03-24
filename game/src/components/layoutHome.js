import "./css_files/home.css";
import {Outlet,NavLink,Navigate } from "react-router-dom";
import {useState} from "react"
import { IoMdHome } from "react-icons/io";
import CurtainMenu from "./curtain_menu.js";
import {useStore} from "../zustore/store.js";
function LayoutHome(){
    const [login,setLogin]=useState(false);
    const {is_loggedIn}= useStore();    
    const {authUser}=useStore();
    if(login){
        return <Navigate to="/login"/>
    }
   if(is_loggedIn){
    return (
        <div className="d_main">
            <div className="cont">
                <div className="d1">

                    <div><NavLink to="/"><IoMdHome className="icon1"/></NavLink></div>
                    <div><button >{authUser}</button></div>

                </div>
                <div className="d_out">
                     <Outlet/>    
                </div>
            </div>
        </div>
    )
   }
    return(
        <div className="d_main">
            <div className="cont">
                <div className="d1">

                    <div><NavLink to="/"><IoMdHome className="icon1"/></NavLink></div>
                    <div><button onClick={() =>{setLogin(true)}}>Login/SignUp</button></div>

                </div>
                <div className="d_out">
                     <Outlet/>    
                </div>
            </div>
        </div>
    )
}
export default LayoutHome;