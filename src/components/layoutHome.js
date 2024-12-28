import "./home.css";
import {Outlet,NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
function LayoutHome(){
    return(
        <div className="d_main">
            <div className="cont">
                <div className="d1">

                    <div><NavLink to="/"><IoMdHome className="icon1"/></NavLink></div>
                    <div><button>Login/SignUp</button></div>

                </div>
                <div className="d_out">
                     <Outlet/>    
                </div>
            </div>
        </div>
    )
}
export default LayoutHome;