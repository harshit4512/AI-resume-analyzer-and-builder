// components/BuilderLayout.jsx
import SectionTabs from "./SectionTabs";
import ResumePreview from "./ResumePreview";
import { useResumeStore } from "../../store/resumeStore";
import { createResume } from "../../services/resume.service.js";

const BuilderLayout = () => {
  const template = useResumeStore((s) => s.template);
  const title    = useResumeStore((s) => s.title);

  const handleSave = async () => {
    try {
      const data = useResumeStore.getState();

      // ── Client-side validation ────────────────────────────────────────────
      if (!data.title?.trim())
        return alert("Resume title is required.\nFill it in the Personal Info tab.");
      if (!data.personalInfo?.fullName?.trim())
        return alert("Full Name is required.\nFill it in the Personal Info tab.");
      if (!data.personalInfo?.email?.trim())
        return alert("Email is required.\nFill it in the Personal Info tab.");

      // ── Map to exact Joi schema shape ─────────────────────────────────────
      //
      // Mismatches fixed:
      // 1. template:  store had "classic" — schema only allows "modern"|"minimal"|"professional"
      // 2. education: store/forms used "school" — schema requires "institution"
      // 3. projects:  store had { techStack: string, link: string }
      //               schema expects { techStack: string[], githubLink: string, liveLink: string }
      // 4. status:    schema allows "draft"|"final" only (not "published")

      const payload = {
        title:    data.title.trim(),
        template: data.template,   // "modern" | "minimal" | "professional"
        status:   data.status,     // "draft"  | "final"

        personalInfo: {
          fullName:  data.personalInfo.fullName,
          email:     data.personalInfo.email,
          phone:     data.personalInfo.phone    || undefined,
          address:   data.personalInfo.address  || undefined,
          // schema validates as URI — skip if empty to avoid Joi uri() failure
          portfolio: data.personalInfo.portfolio?.trim() || undefined,
        },

        summary: data.summary || undefined,

        links: {
          // schema validates as URI — send undefined if empty
          github:   data.links.github?.trim()   || undefined,
          linkedin: data.links.linkedin?.trim()  || undefined,
          leetcode: data.links.leetcode?.trim()  || undefined,
        },

        skills: {
          technical:     data.skills.technical,
          coreSubjects:  data.skills.coreSubjects,
          communication: data.skills.communication,
          tools:         data.skills.tools,
        },

        // ── Education: map "school" → "institution" ───────────────────────
        education: data.education.map((edu) => ({
          institution: edu.institution ?? edu.school ?? "", // support both field names
          degree:      edu.degree,
          startDate:   edu.startDate || undefined,
          endDate:     edu.endDate   || undefined,
        })),

        experience: data.experience.map((exp) => ({
          company:     exp.company,
          role:        exp.role,
          startDate:   exp.startDate   || undefined,
          endDate:     exp.endDate     || undefined,
          description: exp.description || undefined,
        })),

        // ── Projects: map "link" → "githubLink/liveLink", "techStack" string → array ──
        projects: data.projects.map((proj) => ({
          title: proj.title,

          // If techStack is already an array (new forms), use as-is.
          // If it's a comma-separated string (old data), split it.
          techStack: Array.isArray(proj.techStack)
            ? proj.techStack
            : proj.techStack
              ? proj.techStack.split(",").map((s) => s.trim()).filter(Boolean)
              : [],

          description: proj.description || undefined,

          // Map the old "link" field to "githubLink"; "liveLink" left undefined
          // unless you add a separate field in ProjectsForm later.
          githubLink: proj.githubLink?.trim() || proj.link?.trim() || undefined,
          liveLink:   proj.liveLink?.trim()   || undefined,
        })),
      };

      console.log("Sending payload:", JSON.stringify(payload, null, 2)); // remove after testing

      await createResume(payload);
      alert("Saved successfully ✅");
    } catch (error) {
      console.error("Save error:", error.response?.data ?? error);
      alert(
        error.response?.data?.errors?.join("\n") ||
        error.response?.data?.message ||
        "Error saving resume ❌"
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">📄 Resume Builder</span>
          {title && (
            <span className="text-sm text-gray-400 font-normal truncate max-w-[200px]">
              — {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full font-medium capitalize">
            {template} template
          </span>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <span>💾</span>
            Save Resume
          </button>
        </div>
      </header>

      {/* ── Main two-column layout ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 p-6">
          <SectionTabs />
        </div>
        <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
          <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-widest font-semibold">
            Live Preview
          </p>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;