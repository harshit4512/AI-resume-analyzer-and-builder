import {API} from "./api.js"

const registerUser =(data)=>{
   return  API.post("/auth/register",data)
}

const  loginUser = data =>{
    return API.post("/auth/login",data)
}

const logoutUser=()=>{
    API.post("/auth/logout")
}

export {
    registerUser,
    loginUser,
    logoutUser,
}