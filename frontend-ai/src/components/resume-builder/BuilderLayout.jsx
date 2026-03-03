// components/BuilderLayout.jsx
import { useState } from "react";
import SectionTabs from "./SectionTabs";
import ResumePreview from "./Resumepreview";
import { useResumeStore } from "../../store/resumeStore";
import { createResume, updateResume } from "../../services/resume.service.js";

const BuilderLayout = () => {
  const template = useResumeStore((s) => s.template);
  const resumeId = useResumeStore((s) => s._id); // null = never saved

  const [mobileTab, setMobileTab] = useState("form");
  const [isSaving,  setIsSaving]  = useState(false);

  // ── Payload builder ───────────────────────────────────────────────────────
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

  // ── Merged Save / Update ──────────────────────────────────────────────────
  // • No resumeId → POST (create)
  // • Has resumeId → PUT (update)
  const handleSaveOrUpdate = async () => {
    setIsSaving(true);
    try {
      const data = useResumeStore.getState();
      const err  = validate(data);
      if (err) { alert(err); return; }

      const payload = buildPayload(data);

      if (!resumeId) {
        // ── First time: create ──
        const response = await createResume(payload);
        useResumeStore.setState({ _id: response.data.resume._id });
        alert("Resume saved successfully ✅");
      } else {
        // ── Already exists: update ──
        await updateResume(resumeId, payload);
        alert("Resume updated successfully ✅");
      }
    } catch (error) {
      console.error("Save/Update error:", error.response?.data ?? error);
      alert(
        error.response?.data?.errors?.join("\n") ||
        error.response?.data?.message ||
        "Error saving resume ❌"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ── Download as PDF ───────────────────────────────────────────────────────
  // Only enabled after the resume has been saved (resumeId exists).
  // Uses the browser's built-in print dialog targeting only the preview panel.
  const handleDownload = () => {
    if (!resumeId) return; // button is disabled anyway, just a guard

    // Give the preview panel a known id so the print stylesheet targets it
    const previewEl = document.getElementById("resume-print-area");
    if (!previewEl) return;

    // Inject a temporary <style> that hides everything except the preview
    const style = document.createElement("style");
    style.id = "__resume-print-style__";
    style.innerHTML = `
      @media print {
        body > * { display: none !important; }
        #resume-print-area,
        #resume-print-area * { display: revert !important; }
        #resume-print-area { position: fixed; inset: 0; transform: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    // Clean up after print dialog closes
    document.head.removeChild(style);
  };

  // ── Derived button label ──────────────────────────────────────────────────
  const saveLabel = isSaving
    ? "Saving…"
    : resumeId
      ? "✏️ Update"
      : "💾 Save";

  const saveClass = resumeId
    ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
    : "bg-green-600 hover:bg-green-700 active:bg-green-800";

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base md:text-lg font-bold text-gray-900">📄 Resume Builder</span>
          <span className="hidden sm:inline text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full font-medium capitalize">
            {template} template
          </span>
        </div>

        <div className="flex items-center gap-2">

          {/* ── Merged Save / Update button ── */}
          <button
            onClick={handleSaveOrUpdate}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm
              ${isSaving ? "bg-gray-400 cursor-not-allowed" : saveClass}`}
          >
            {saveLabel}
          </button>

          {/* ── Download button — disabled until saved ── */}
          <button
            onClick={handleDownload}
            disabled={!resumeId}
            title={!resumeId ? "Save your resume first to enable download" : "Download as PDF"}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-2 text-sm font-semibold rounded-lg transition-colors shadow-sm
              ${resumeId
                ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <span>⬇️</span>
            <span className="hidden sm:inline">Download</span>
          </button>

        </div>
      </header>

      {/* ── Mobile tab switcher ───────────────────────────────────────────── */}
      <div className="flex md:hidden border-b border-gray-200 bg-white shrink-0">
        <button
          onClick={() => setMobileTab("form")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors
            ${mobileTab === "form"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors
            ${mobileTab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          👁️ Preview
        </button>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Form panel */}
        <div
          className={`
            w-full md:w-1/2 overflow-y-auto border-r border-gray-200 p-4 md:p-6
            ${mobileTab === "form" ? "block" : "hidden"} md:block
          `}
        >
          <SectionTabs />
        </div>

        {/* Preview panel — id used by print handler */}
        <div
          className={`
            w-full md:w-1/2 overflow-y-auto bg-gray-100 p-4 md:p-6
            ${mobileTab === "preview" ? "block" : "hidden"} md:block
          `}
        >
          <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-widest font-semibold">
            Live Preview
          </p>
          <div id="resume-print-area">
            <ResumePreview />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuilderLayout;