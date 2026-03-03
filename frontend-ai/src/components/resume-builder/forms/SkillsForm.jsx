import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls = "flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide";

const CATEGORIES = [
  { key: "technical",     label: "Technical Skills",     placeholder: "e.g. React, Node.js, Python" },
  { key: "coreSubjects",  label: "Core Subjects",        placeholder: "e.g. DSA, OS, DBMS, CN" },
  { key: "communication", label: "Communication / Soft", placeholder: "e.g. Leadership, Teamwork" },
  { key: "tools",         label: "Tools & Platforms",    placeholder: "e.g. Git, Docker, AWS" },
];

const CategoryInput = ({ categoryKey, label, placeholder, values, onUpdate }) => {
  const [input, setInput] = useState("");
  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed || values.includes(trimmed)) { setInput(""); return; }
    onUpdate(categoryKey, [...values, trimmed]);
    setInput("");
  };
  const removeItem = (idx) => onUpdate(categoryKey, values.filter((_, i) => i !== idx));
  const handleKeyDown = (e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addItem(); } };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
      <label className={labelCls}>{label}</label>
      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {values.length === 0
          ? <span className="text-xs text-gray-400 italic">No items yet — type below and press Enter</span>
          : values.map((val, i) => (
              <span key={i} className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {val}
                <button onClick={() => removeItem(i)} className="text-green-500 hover:text-red-500 transition-colors font-black leading-none ml-0.5">×</button>
              </span>
            ))}
      </div>
      <div className="flex gap-2">
        <input className={inputCls} placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={addItem} className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap">
          + Add
        </button>
      </div>
      <p className="text-xs text-gray-400">Press Enter or comma to add</p>
    </div>
  );
};

const SkillsForm = () => {
  const skills = useResumeStore((s) => s.skills);
  const updateSkills = useResumeStore((s) => s.updateSkills);
  return (
    <div className="space-y-4">
      {CATEGORIES.map((cat) => (
        <CategoryInput key={cat.key} categoryKey={cat.key} label={cat.label} placeholder={cat.placeholder} values={skills[cat.key] ?? []} onUpdate={updateSkills} />
      ))}
    </div>
  );
};
export default SkillsForm;