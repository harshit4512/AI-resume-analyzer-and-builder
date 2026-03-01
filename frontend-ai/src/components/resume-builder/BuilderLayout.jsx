// components/BuilderLayout.jsx
import SectionTabs from "./SectionTabs";
import ResumePreview from "./Resumepreview";
import { useResumeStore } from "../../store/resumeStore";
import { createResume, updateResume } from "../../services/resume.service.js";

const BuilderLayout = () => {
  const template = useResumeStore((s) => s.template);
  const title    = useResumeStore((s) => s.title);
  const resumeId = useResumeStore((s) => s._id); // null = never saved, string = existing resume

  // ── Shared payload builder ────────────────────────────────────────────────
  const buildPayload = (data) => ({
    title:    data.title.trim(),
    template: data.template,
    status:   data.status,

    personalInfo: {
      fullName:  data.personalInfo.fullName,
      email:     data.personalInfo.email,
      phone:     data.personalInfo.phone             || undefined,
      address:   data.personalInfo.address           || undefined,
      portfolio: data.personalInfo.portfolio?.trim() || undefined,
    },

    summary: data.summary || undefined,

    links: {
      github:   data.links.github?.trim()   || undefined,
      linkedin: data.links.linkedin?.trim() || undefined,
      leetcode: data.links.leetcode?.trim() || undefined,
    },

    skills: {
      technical:     data.skills.technical,
      coreSubjects:  data.skills.coreSubjects,
      communication: data.skills.communication,
      tools:         data.skills.tools,
    },

    education: data.education.map((edu) => ({
      institution: edu.institution ?? edu.school ?? "",
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

    projects: data.projects.map((proj) => ({
      title: proj.title,
      techStack: Array.isArray(proj.techStack)
        ? proj.techStack
        : proj.techStack
          ? proj.techStack.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      description: proj.description        || undefined,
      githubLink:  proj.githubLink?.trim() || proj.link?.trim() || undefined,
      liveLink:    proj.liveLink?.trim()   || undefined,
    })),
  });

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = (data) => {
    if (!data.title?.trim())
      return "Resume title is required.\nFill it in the Personal Info tab.";
    if (!data.personalInfo?.fullName?.trim())
      return "Full Name is required.\nFill it in the Personal Info tab.";
    if (!data.personalInfo?.email?.trim())
      return "Email is required.\nFill it in the Personal Info tab.";
    return null;
  };

  // ── Save — always creates a NEW resume (POST) ─────────────────────────────
  const handleSave = async () => {
    try {
      const data = useResumeStore.getState();
      const err  = validate(data);
      if (err) return alert(err);

      const payload  = buildPayload(data);
      const response = await createResume(payload);

      // Store the returned _id so Update button works immediately after saving
      // useResumeStore.setState({ _id: response.resume._id });
      useResumeStore.setState({ _id: response.data.resume._id });

      alert("Resume saved successfully ✅");
    } catch (error) {
      console.error("Save error:", error.response?.data ?? error);
      alert(
        error.response?.data?.errors?.join("\n") ||
        error.response?.data?.message ||
        "Error saving resume ❌"
      );
    }
  };

  // ── Update — always updates EXISTING resume (PUT) ─────────────────────────
  const handleUpdate = async () => {
    // Guard: can't update if resume has never been saved yet
    if (!resumeId) {
      return alert("Please save the resume first before updating.");
    }

    try {
      const data = useResumeStore.getState();
      const err  = validate(data);
      if (err) return alert(err);

      const payload = buildPayload(data);
      await updateResume(resumeId, payload);

      alert("Resume updated successfully ✅");
    } catch (error) {
      console.error("Update error:", error.response?.data ?? error);
      alert(
        error.response?.data?.errors?.join("\n") ||
        error.response?.data?.message ||
        "Error updating resume ❌"
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
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

          {/* Save — creates new resume (POST) */}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <span>💾</span>
            Save
          </button>

          {/* Update — updates existing resume (PUT), greyed out until saved */}
          <button
            onClick={handleUpdate}
            disabled={!resumeId}
            className={`flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm
              ${resumeId
                ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            <span>✏️</span>
            Update
          </button>
        </div>
      </header>

      {/* ── Main two-column layout ──────────────────────────────────────────── */}
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




