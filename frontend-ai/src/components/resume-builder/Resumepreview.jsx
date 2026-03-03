// components/resume-builder/ResumePreview.jsx
import { useEffect, useRef, useState } from "react";
import { useResumeStore } from "../../store/resumeStore.js";

import ModernTemplate       from "./templates/ModernTemplate";
import MinimalTemplate      from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

// ── Template registry ─────────────────────────────────────────────────────────
const TEMPLATES = {
  modern:       ModernTemplate,
  minimal:      MinimalTemplate,
  professional: ProfessionalTemplate,
};

// A4 width in pixels at 96 dpi
const A4_WIDTH = 794;

// ── ResumePreview ─────────────────────────────────────────────────────────────
const ResumePreview = () => {
  const template    = useResumeStore((s) => s.template);
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const summary     = useResumeStore((s) => s.summary);
  const experience  = useResumeStore((s) => s.experience);
  const education   = useResumeStore((s) => s.education);
  const skills      = useResumeStore((s) => s.skills);
  const projects    = useResumeStore((s) => s.projects);
  const links       = useResumeStore((s) => s.links);

  const Template = TEMPLATES[template] ?? ModernTemplate;

  const wrapperRef = useRef(null);
  const [scale, setScale]   = useState(1);
  const [height, setHeight] = useState("auto");
  const innerRef = useRef(null);

  useEffect(() => {
    const recalc = () => {
      if (!wrapperRef.current) return;
      const containerW = wrapperRef.current.offsetWidth;
      const s = Math.min(1, containerW / A4_WIDTH);
      setScale(s);
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // Keep the outer wrapper height in sync with the scaled inner height
  useEffect(() => {
    if (!innerRef.current) return;
    const mo = new MutationObserver(syncHeight);
    mo.observe(innerRef.current, { childList: true, subtree: true });
    syncHeight();
    return () => mo.disconnect();
  }, [scale]);

  const syncHeight = () => {
    if (!innerRef.current) return;
    setHeight(innerRef.current.scrollHeight * scale);
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* ── Header bar ── */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white text-xs">
        <span className="font-semibold uppercase tracking-wide">Preview</span>
        <span className="bg-gray-600 px-2 py-0.5 rounded text-gray-200 capitalize">
          Template: <strong>{template}</strong>
        </span>
      </div>

      {/*
        Outer wrapper: fills container width, height tracks scaled content.
        overflow-hidden so nothing bleeds out.
      */}
      <div
        ref={wrapperRef}
        className="w-full overflow-hidden bg-white"
        style={{ height: height === "auto" ? "auto" : `${height}px` }}
      >
        {/*
          Inner div: fixed A4 width, scaled down via transform-origin top-left.
          transform-origin must be top-left so scaling shrinks rightward/downward.
        */}
        <div
          ref={innerRef}
          style={{
            width: `${A4_WIDTH}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <Template
            personalInfo={personalInfo}
            summary={summary}
            experience={experience}
            education={education}
            skills={skills}
            projects={projects}
            links={links}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;