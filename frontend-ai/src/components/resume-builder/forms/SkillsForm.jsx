// forms/SkillsForm.jsx
// Fix: stop calling useResumeStore inside CategoryInput entirely.
// Pull skills + updateSkills ONCE at the top-level SkillsForm component,
// then pass each category's array down as a plain prop.
// This completely eliminates selector instability and cross-contamination.

import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls =
  "block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide";

const CATEGORIES = [
  { key: "technical",     label: "Technical Skills",     placeholder: "e.g. React, Node.js, Python" },
  { key: "coreSubjects",  label: "Core Subjects",        placeholder: "e.g. DSA, OS, DBMS, CN" },
  { key: "communication", label: "Communication / Soft", placeholder: "e.g. Leadership, Teamwork" },
  { key: "tools",         label: "Tools & Platforms",    placeholder: "e.g. Git, Docker, AWS" },
];

// ─── CategoryInput ────────────────────────────────────────────────────────────
// Pure presentational component — NO useResumeStore calls here at all.
// Receives its own values array and update function as props from parent.

const CategoryInput = ({ categoryKey, label, placeholder, values, onUpdate }) => {
  const [input, setInput] = useState("");

  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) { setInput(""); return; }
    onUpdate(categoryKey, [...values, trimmed]);
    setInput("");
  };

  const removeItem = (idx) => {
    onUpdate(categoryKey, values.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
      <label className={labelCls}>{label}</label>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {values.length === 0 ? (
          <span className="text-xs text-gray-400 italic">No items yet</span>
        ) : (
          values.map((val, i) => (
            <span
              key={`${categoryKey}-${i}`}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {val}
              <button
                onClick={() => removeItem(i)}
                className="text-blue-500 hover:text-red-500 transition-colors font-bold leading-none"
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      {/* Add input */}
      <div className="flex gap-2">
        <input
          className={inputCls}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addItem}
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          + Add
        </button>
      </div>
      <p className="text-xs text-gray-400">Press Enter or comma to add</p>
    </div>
  );
};

// ─── SkillsForm ───────────────────────────────────────────────────────────────
// Single useResumeStore call here — stable because we select
// s.skills (same object reference until updateSkills is called)
// and s.updateSkills (a function, never changes reference in Zustand).

const SkillsForm = () => {
  const skills       = useResumeStore((s) => s.skills);
  const updateSkills = useResumeStore((s) => s.updateSkills);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800 text-base">Skills</h3>
      {CATEGORIES.map((cat) => (
        <CategoryInput
          key={cat.key}
          categoryKey={cat.key}
          label={cat.label}
          placeholder={cat.placeholder}
          values={skills[cat.key] ?? []}   // pass THIS category's array as prop
          onUpdate={updateSkills}           // stable function reference
        />
      ))}
    </div>
  );
};

export default SkillsForm;