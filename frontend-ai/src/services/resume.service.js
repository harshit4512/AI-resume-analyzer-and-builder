import {API} from "./api.js"

const createResume = (data) => {
  return API.post("/resume", data)
}

const getResumes = () => {
  return API.get("/resume")
}

const getResumeById = (id) => {
  return API.get(`/resume/${id}`)
}

const updateResume = (id, data) => {
  return API.put(`/resume/${id}`, data)
}

const deleteResume = (id) => {
  return API.delete(`/resume/${id}`)
}

const downloadResumePDF = (id) => {
  return API.get(`/resume/${id}/pdf`, {
    responseType: "arraybuffer",
  });
};

export {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    downloadResumePDF
}