// components/resume-builder/SectionTabs.jsx
import { useState } from "react";
import { useResumeStore } from "../../store/resumeStore.js";
import PersonalInfoForm from "./forms/PersonalInfoForm.jsx";
import SummaryForm      from "./forms/SummaryForm.jsx";
import SkillsForm       from "./forms/SkillsForm.jsx";
import EducationForm    from "./forms/EducationForm.jsx";
import ExperienceForm   from "./forms/ExperienceForm.jsx";
import ProjectsForm     from "./forms/ProjectsForm.jsx";

const TABS = [
  { id: "personal",   label: "Personal",   icon: "👤" },
  { id: "summary",    label: "Summary",    icon: "📝" },
  { id: "skills",     label: "Skills",     icon: "🛠"  },
  { id: "education",  label: "Education",  icon: "🎓" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects",   label: "Projects",   icon: "🚀" },
];

const FORM_MAP = {
  personal:   PersonalInfoForm,
  summary:    SummaryForm,
  skills:     SkillsForm,
  education:  EducationForm,
  experience: ExperienceForm,
  projects:   ProjectsForm,
};

// ── Per-section fill % ────────────────────────────────────────────────────────
const useSectionProgress = () => {
  const title      = useResumeStore((s) => s.title);
  const personal   = useResumeStore((s) => s.personalInfo);
  const summary    = useResumeStore((s) => s.summary);
  const links      = useResumeStore((s) => s.links);
  const skills     = useResumeStore((s) => s.skills);
  const education  = useResumeStore((s) => s.education);
  const experience = useResumeStore((s) => s.experience);
  const projects   = useResumeStore((s) => s.projects);

  const pct = (filled, total) => Math.round((filled / total) * 100);
  const has = (v) => !!(v && String(v).trim());

  const sections = {
    personal: pct(
      [title, personal.fullName, personal.email, personal.phone, personal.address, personal.portfolio]
        .filter(has).length, 6
    ),
    summary: pct(
      [summary, links.github, links.linkedin, links.leetcode].filter(has).length, 4
    ),
    skills: pct(
      Object.values(skills).filter((arr) => arr.length > 0).length, 4
    ),
    education:  education.length  > 0 ? 100 : 0,
    experience: experience.length > 0 ? 100 : 0,
    projects:   projects.length   > 0 ? 100 : 0,
  };

  const overall = Math.round(
    Object.values(sections).reduce((a, b) => a + b, 0) / TABS.length
  );

  return { sections, overall };
};

// ── Component ─────────────────────────────────────────────────────────────────
const SectionTabs = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { sections, overall } = useSectionProgress();

  const active     = TABS[activeIdx];
  const isFirst    = activeIdx === 0;
  const isLast     = activeIdx === TABS.length - 1;
  const ActiveForm = FORM_MAP[active.id];
  const sectionPct = sections[active.id];

  return (
    <div className="flex flex-col gap-4">

      {/* Overall progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Overall Progress
          </span>
          <span className={`text-xs font-bold ${
            overall === 100 ? "text-green-600"
            : overall >= 50  ? "text-yellow-500"
            : "text-gray-400"
          }`}>
            {overall}% filled
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              overall === 100 ? "bg-green-500"
              : overall >= 50  ? "bg-yellow-400"
              : "bg-green-500"
            }`}
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      {/* Tab pills */}
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((tab, idx) => {
          const isActive   = idx === activeIdx;
          const isComplete = sections[tab.id] === 100;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-green-500 text-white border-green-500 shadow-sm shadow-green-200"
                  : isComplete
                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {isComplete && !isActive ? (
                <svg className="w-3 h-3 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{tab.icon}</span>
              )}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-sm shrink-0">
            {active.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-800 text-sm leading-none">{active.label}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {sectionPct === 100
                ? "✅ Section complete"
                : `${sectionPct}% of this section filled`}
            </p>
          </div>

          {/* Step dots — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1.5">
            {TABS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIdx ? "w-5 h-2 bg-green-500"
                  : idx < activeIdx  ? "w-2 h-2 bg-green-300"
                  : "w-2 h-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Mini section progress bar — hidden on mobile */}
          <div className="hidden sm:block w-20 shrink-0">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${sectionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="p-4 sm:p-5">
          <ActiveForm />
        </div>

        {/* Prev / Next */}
        <div className="px-4 sm:px-5 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => setActiveIdx((i) => i - 1)}
            disabled={isFirst}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              isFirst
                ? "text-gray-300 border-gray-100 bg-gray-50 cursor-not-allowed"
                : "text-gray-600 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-xs text-gray-400 font-medium">{overall}% complete</span>

          <button
            onClick={() => !isLast && setActiveIdx((i) => i + 1)}
            disabled={isLast}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isLast
                ? "text-gray-300 border border-gray-100 bg-gray-50 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-200 hover:-translate-y-0.5"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTabs;