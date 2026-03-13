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

const getMe = () => {
    API.get("/auth/me");
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}