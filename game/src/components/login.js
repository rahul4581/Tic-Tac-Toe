import "./css_files/login.css"
import {Navigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"
import {useStore} from "../zustore/store.js"
function Login(){
    const {Login}= useStore();
    const {is_loggedIn}= useStore();
    const [username ,setUsername]=useState("");
    const [password ,setPassword]=useState("");
    const [signup ,setSignup]=useState(false);
    const handleUsername =(e) =>{setUsername(e.target.value)}
    const handlePassword =(e) =>{setPassword(e.target.value)}

    const loginUser= async (e) =>{
        e.preventDefault()
        await Login(username,password)

    }
    if(signup){return <Navigate to="/signup"/>}
    if(is_loggedIn){
        return <Navigate to="/"/>
    }
    return (
        <div className="login_c">
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" onChange={handleUsername}  required/>
                    <i class='bx bxs-user'></i>
                </div>
                <div className="input-box">
                    <input type="password" onChange={handlePassword} placeholder="Password" required/>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/> Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit" onClick={loginUser} className="btn">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#" onClick={() =>{setSignup(true)}}>Register</a></p>
                </div>  
            </form>
        </div>
        </div>
    )
}

export default Login;