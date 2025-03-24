import "./css_files/signup.css"
import axios from "axios"
import {useState} from "react"
import {Navigate} from "react-router-dom"

function Signup(){
    const [login,setLogin]=useState(false);
    const [username ,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [usernameError,setUsernameError]=useState("")
    const [emailError,setEmailError]=useState("");
    const [confirmPasswordError,setConfirmPasswordError]=useState("");

    const handleUsername = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        
        if (newUsername.length < 4) {
            setUsernameError("Username must be at least 4 characters ");
        } else {
            setUsernameError("");
        }
    };
    const handleEmail = (e) => {
        const newEmail=e.target.value
        setEmail(newEmail)
        if(newEmail.substring(newEmail.length-10)=="@gmail.com"){
            setEmailError("")
        }else{
            setEmailError("Email must end with @gmail.com")
        }
    };
    const handleConfirmPassword=(e)=>{
        const newConfirmPassword=e.target.value
        setConfirmPassword(newConfirmPassword)
        if(newConfirmPassword!=password){
            setConfirmPasswordError("Confirm Password and Password should match ")
        }else{
            setConfirmPasswordError("")
        }
    }
    const registerUser=(e) =>{
        e.preventDefault()
        
            axios.post("http://localhost:5000/api/v1/user/register",{username,email,password,confirmPassword})
            .then(res => {console.log(res)
            setLogin(true)})
            .catch(err => console.log(err))
        }
    if(login){return <Navigate to="/login"/>}   
    return (
        <div className="signup_c">
       <div className="wrapper">
            <form action="" onSubmit={registerUser}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" onChange ={(e) =>{handleUsername(e)}} required/>
                    <p className="errorMsg">{usernameError}</p>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Email" required  onChange={(e) =>{handleEmail(e)}}/>
                    <p className="errorMsg">{emailError}</p>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required onChange={(e) =>{setPassword(e.target.value)}}/>
                    <p className="errorMsg"></p>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm Password" required onChange={(e)=>{handleConfirmPassword(e)}}/>
                    <p className="errorMsg">{confirmPasswordError}</p>
                </div>
                <button type="submit" onClick={registerUser} className="btn" >Sign up</button>
            </form>
        </div>
        </div>
    )
}
export default Signup