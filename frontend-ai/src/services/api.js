

import axios from "axios";
import { useAuthStore } from "../store/authStore"; // adjust path to your store

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,   // If request is successful, simply return the response.

  async (error) => {

    // Save the request that failed.
    // Example: GET /resume
    const originalRequest = error.config;

    // Check whether the failed request is the refresh API.
    // If yes, don't try to refresh again.
    const isRefreshCall = originalRequest.url?.includes("/auth/refresh");

    // Continue only if:
    // 1. Access token expired (401)
    // 2. Request hasn't been retried before
    // 3. This is not the refresh API
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {

      // Mark request as retried.
      // Prevents infinite retry loops.
      originalRequest._retry = true;

      try {

        // Ask backend for a new Access Token.
        // Refresh Token cookie is sent automatically.
        await API.post("/auth/refresh");

        // New Access Token received.
        // Send the same request again.
        return API(originalRequest);

      } catch (refreshError) {

        // Refresh Token also expired.
        // User must login again.
        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
        });

        // Return the error.
        return Promise.reject(refreshError);
      }
    }

    // Refresh API itself failed.
    // Logout the user.
    if (isRefreshCall) {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
      });
    }

    // Return any other error.
    return Promise.reject(error);

  }
);

export { API };