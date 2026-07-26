

// import axios from "axios";

// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}/api`,
//   withCredentials: true,
// });

// API.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     // ✅ CHANGED — never try to refresh if the FAILED request was itself the refresh call.
//     // Prevents infinite loop when the user has no valid session at all.
//     const isRefreshCall = originalRequest.url?.includes("/auth/refresh");

//     if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
//       originalRequest._retry = true;

//       try {
//         await API.post("/auth/refresh");
//         return API(originalRequest);
//       } catch (refreshError) {
//         // refresh itself failed — genuinely logged out, stop here
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export { API };

import axios from "axios";
import { useAuthStore } from "../store/authStore"; // adjust path to your store

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await API.post("/auth/refresh");
        return API(originalRequest);
      } catch (refreshError) {
        // ✅ ADDED — refresh definitively failed, mark the user as logged out
        useAuthStore.setState({ user: null, isAuthenticated: false });
        return Promise.reject(refreshError);
      }
    }

    // ✅ ADDED — the refresh call itself failed (no valid refresh token at all)
    if (isRefreshCall) {
      useAuthStore.setState({ user: null, isAuthenticated: false });
    }

    return Promise.reject(error);
  }
);

export { API };