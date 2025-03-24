import {apiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"
export const verifyJWT=asyncHandler(async (requestAnimationFrame,resizeBy,next) =>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        if(!token){
            throw new apiError(401,"Please login to access this resource")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(401,"Please login to access this resource")
        }
        req.user=user
        next()
    } catch (error) {
        throw new apiError(401,"invalid access token")
    }
})