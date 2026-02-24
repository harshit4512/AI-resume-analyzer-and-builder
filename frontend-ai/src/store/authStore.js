import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useResumeStore } from "./resumeStore"; // import resume store

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (data) =>
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        // 🔥 Clear resume data also
        // useResumeStore.getState().clearResume();
        // useResumeStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);