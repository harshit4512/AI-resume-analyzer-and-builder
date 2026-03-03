import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
const EMPTY = { role: "", company: "", startDate: "", endDate: "", description: "" };

const ExperienceForm = () => {
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.company.trim()) e.company = "Company is required";
    return e;
  };
  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addExperience({ ...form });
    setForm(EMPTY); setErrors({});
  };

  return (
    <div className="space-y-4">
      {experience.length > 0 && (
        <div className="space-y-2">
          {experience.map((exp, i) => (
            <div key={i} className="flex justify-between items-start bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-gray-800">{exp.role} — {exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : "– Present"}</p>
                {exp.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{exp.description}</p>}
              </div>
              <button onClick={() => removeExperience(i)} className="text-red-400 hover:text-red-600 text-xs font-bold ml-4 mt-0.5 transition-colors shrink-0">Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3 bg-gray-50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Add Experience</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Role / Title <span className="text-red-400">*</span></label>
            <input className={`${inputCls} ${errors.role ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="Software Engineer" value={form.role} onChange={(e) => { setForm({ ...form, role: e.target.value }); setErrors({}); }} />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>
          <div>
            <label className={labelCls}>Company <span className="text-red-400">*</span></label>
            <input className={`${inputCls} ${errors.company ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="Google" value={form.company} onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({}); }} />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Start Date</label>
            <input className={inputCls} type="month" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>End Date</label>
            <input className={inputCls} type="month" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea className={`${inputCls} resize-none h-24`} placeholder="• Describe your responsibilities and achievements..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button onClick={handleAdd} className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-green-200">
          + Add Experience
        </button>
      </div>
    </div>
  );
};
export default ExperienceForm;