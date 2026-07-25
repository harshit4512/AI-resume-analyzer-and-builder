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

// ✅ ADDED — this is what actually triggers refreshTokenService

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // only try refresh once per request, and only on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await API.post("/auth/refresh"); // hits your new /refresh route → refreshTokenService runs
        return API(originalRequest);      // retry the original failed request with new cookies
      } catch (refreshError) {
        // refresh token itself invalid/expired → truly logged out
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { API };