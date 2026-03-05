import { API } from "./api.js"

const analyzeResume = (formData) => {
    return API.post("/ai/analyze", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export { analyzeResume }