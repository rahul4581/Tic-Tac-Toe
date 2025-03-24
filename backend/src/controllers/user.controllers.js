import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import cookie from "cookie-parser"
const registerUser =asyncHandler( async (req,res) =>{
    /*
     PROCESS FOR FORM VALIDATION IN REGISTRATION
     -> CHECK IF THE FIELDS ARE EMPTY
     ->CHECK IF THE USER ALREADY EXISTS
     ->IF ANY IMAGES EXISTS UPLOAD THEM TO CLUDINARY
     ->CREATE USER OBJECT IN DB
     ->SEND RESPONSE
     */
    const { username, email, password ,confirmPassword} = req.body; 
    if(username==""|| email==""|| password==""|| confirmPassword==""){
        throw new apiError(400,"Fields shouldn't be empty")
    }
    if(password!=confirmPassword){
        throw new apiError(400,"Password doesn't match")
    }
    const existedUser= await User.findOne({ $or:[{username},{email}]})
    if(existedUser){
        throw new apiError(409,"user already exists")
    }
     

    const newUser = new User({ username, email, password,confirmPassword }); 
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
})
const generateAccessRefreshTokens=async (userId) =>{
    try{
        const user=await User.findById(userId)
        const refreshToken=user.generateRefreshToken()
        const accessToken=user.generateAccessToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    }catch(err){
        throw new apiError(500,err.message)
    }
}
const loginUser=asyncHandler( async (req,res) =>{
    /*TO DO'S IN LOGIN USER
    ->REQ DETAILS THROUGH BODY
    ->CHECK WHEATHER THE USER EXISTS
    ->PASSWORD CHECK
    ->GENERATING ACCESS AND REFRESH TOKEN
    ->SEND COOKIEES
    ->SEND RESPONSE
    */ 
   const {username,password}=req.body;
   if(!username ||!password){
        throw new apiError(400,"username or passsword is empty")
   }
   const user=await User.findOne({username})
   if(!user){
    throw new apiError(404,"User not found")
   }
   const isPassCorrect=await user.isPasswordCorrect(password)
   console.log("provided password:",password)
   console.log("db password:",user.password)
   console.log("isPassCorrect:",isPassCorrect)
   if(!isPassCorrect){
    throw new apiError(401,"Password is incorrect")
   }
   const {accessToken,refreshToken}=await generateAccessRefreshTokens(user._id)
   const loggedInUser=await User.findById(user._id)
   const options=(
    {
        httpOnly:true,
        secure:true
    }
   )
    res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json({
    "user":loggedInUser.username
   })
})

const logoutUser=asyncHandler(async (req,res) =>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    res.status(200).
    clearCookie("accessToken",options).
    clearCookie("refreshToken",options).
    json(new apiResponse(200,{},"User logged out successfully"))
})

const checkAuth = asyncHandler(async (req, res) => {
    const token = req.cookies.accessToken;
    
    if (!token) return res.json({ isAuth: false });

    try {
        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded_token._id);
        
        if (!user) return res.json({ isAuth: false });

        return res.json({ isAuth: true, user: user.username });
    } catch (error) {
        return res.json({ isAuth: false, message: "Invalid token" });
    }
});

export  {registerUser,loginUser,logoutUser,checkAuth}