// import axios from "axios"

// const API=axios.create({
//     baseURL:`${import.meta.env.VITE_API_URL}/api`,
//     withCredentials:true,
// })

// export {
//     API
// }

import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {}
  return config;
});

export { API };