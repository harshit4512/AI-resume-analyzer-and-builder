import axios from "axios"

const API=axios.create({
    baseURL:"https://ai-resume-analyzer-and-builder.onrender.com/api",
    withCredentials:true,
})

export {
    API
}