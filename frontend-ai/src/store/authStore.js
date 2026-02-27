// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { useResumeStore } from "./resumeStore"; // import resume store

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,

//       login: (data) =>
//         set({
//           user: data.user,
//           token: data.token,
//           isAuthenticated: true,
//         }),

//       logout: () => {
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         });

//         // 🔥 Clear resume data also
//         useResumeStore.getState().clearResume();
//         useResumeStore.persist.clearStorage();
//       },
//     }),
//     {
//       name: "auth-storage",
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useResumeStore } from "./resumeStore";

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
        // ── Clear resume store + localStorage on logout ──────────────────────
        // Ensures this user's resume data is wiped so the next user
        // who logs in on the same browser starts completely fresh.
        useResumeStore.getState().clearResume();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);