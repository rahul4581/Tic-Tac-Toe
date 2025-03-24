import {create} from "zustand"
import axios from "axios"

export const useStore= create((set,get) =>({
    authUser:null,
    is_loggedIn:false,

    Login: async(username,password) =>{
        try{
            const res=await axios.post("http://localhost:5000/api/v1/user/login",{username,password})
            set({authUser:res.data.user,is_loggedIn:true,check_logged:true})
            console.log(get().authUser)
            console.log(get().is_loggedIn)

        }catch (error){
            console.log(error)
        }
    },
    CheckAuth: async ()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/v1/user/checkAuth",{withCredentials:true})
            res.data.isAuth ? set({authUser:res.data.user ,is_loggedIn:true}) : set({authUser:null,is_loggedIn:false})
        }catch (error){
            console.log(error)
        }
    }
}))