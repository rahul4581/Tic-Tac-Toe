import { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaChevronLeft } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import "./css_files/curtain_menu.css";
function CurtainMenu(){
    const [isOpen,setOpen]= useState(false)
    return(
        <div>
            <TfiAlignJustify className="menubar" onClick={() =>{
                
                setOpen(!isOpen)}}/>
            <div className={`menu-bar ${isOpen? 'open':'close'}`}>
                <div className="profile_photo"></div>
                <h2 className="menubar1">User Name</h2>
                <FaChevronLeft className="menubar2" onClick={() => {setOpen(!isOpen)}}/>
                <div className="menubar3">
                    <hr></hr>
                    <a href="#logout" >Log Out</a>
                </div>
            </div>
        </div>
    )
}
export default CurtainMenu;