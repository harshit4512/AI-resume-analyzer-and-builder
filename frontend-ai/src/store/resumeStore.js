// store/resumeStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  title:    "",
  template: "modern",   // schema allows: "modern" | "minimal" | "professional"
  status:   "draft",    // schema allows: "draft" | "final"

  personalInfo: {
    fullName:  "",
    email:     "",
    phone:     "",
    address:   "",
    portfolio: "",
  },

  summary: "",

  links: {
    github:   "",
    linkedin: "",
    leetcode: "",
  },

  skills: {
    technical:     [],
    coreSubjects:  [],
    communication: [],
    tools:         [],
  },

  projects:   [],
  // project shape:  { title, techStack: string[], description, githubLink, liveLink }

  experience: [],
  // exp shape:      { role, company, startDate, endDate, description }

  education:  [],
  // edu shape:      { institution, degree, startDate, endDate }  ← "institution" NOT "school"
};

export const useResumeStore = create(
  persist(
    (set) => ({
      ...initialState,

      setField: (key, value) => set(() => ({ [key]: value })),

      updatePersonalInfo: (data) =>
        set((s) => ({ personalInfo: { ...s.personalInfo, ...data } })),

      updateLinks: (data) =>
        set((s) => ({ links: { ...s.links, ...data } })),

      updateSkills: (category, values) =>
        set((s) => ({ skills: { ...s.skills, [category]: values } })),

      // ── Education ── field is "institution" to match Joi schema ──────────────
      addEducation: (edu) =>
        set((s) => ({ education: [...s.education, edu] })),

      removeEducation: (index) =>
        set((s) => ({ education: s.education.filter((_, i) => i !== index) })),

      updateEducation: (index, data) =>
        set((s) => {
          const updated = [...s.education];
          updated[index] = { ...updated[index], ...data };
          return { education: updated };
        }),

      // ── Experience ───────────────────────────────────────────────────────────
      addExperience: (exp) =>
        set((s) => ({ experience: [...s.experience, exp] })),

      removeExperience: (index) =>
        set((s) => ({ experience: s.experience.filter((_, i) => i !== index) })),

      updateExperience: (index, data) =>
        set((s) => {
          const updated = [...s.experience];
          updated[index] = { ...updated[index], ...data };
          return { experience: updated };
        }),

      // ── Projects ── techStack is string[], githubLink + liveLink not "link" ──
      addProject: (proj) =>
        set((s) => ({ projects: [...s.projects, proj] })),

      removeProject: (index) =>
        set((s) => ({ projects: s.projects.filter((_, i) => i !== index) })),

      updateProject: (index, data) =>
        set((s) => {
          const updated = [...s.projects];
          updated[index] = { ...updated[index], ...data };
          return { projects: updated };
        }),

      // ── Clear on logout ───────────────────────────────────────────────────────
      clearResume: () => {
        set(() => ({ ...initialState }));
        useResumeStore.persist.clearStorage();
      },
    }),

    {
      name:    "resume-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        title:        state.title,
        template:     state.template,
        status:       state.status,
        personalInfo: state.personalInfo,
        summary:      state.summary,
        links:        state.links,
        skills:       state.skills,
        projects:     state.projects,
        experience:   state.experience,
        education:    state.education,
      }),
    }
  )
);