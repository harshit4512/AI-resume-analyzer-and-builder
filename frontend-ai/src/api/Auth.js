import axios from "axios"

const API=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
})

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
    logoutUser
}