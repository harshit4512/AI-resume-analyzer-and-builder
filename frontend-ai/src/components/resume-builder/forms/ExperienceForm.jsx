// forms/ExperienceForm.jsx
// Field contract matching store & preview: { role, company, startDate, endDate, description }
import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls =
  "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const EMPTY = {
  role: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
};

const ExperienceForm = () => {
  const experience      = useResumeStore((s) => s.experience);
  const addExperience   = useResumeStore((s) => s.addExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  const [form, setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.role.trim())    e.role    = "Role is required";
    if (!form.company.trim()) e.company = "Company is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addExperience({ ...form });
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-gray-800 text-base">Experience</h3>

      {/* Saved entries */}
      {experience.length > 0 && (
        <div className="space-y-2">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="flex justify-between items-start bg-green-50 border border-green-200 rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {exp.role} — {exp.company}
                </p>
                <p className="text-xs text-gray-400">
                  {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : "– Present"}
                </p>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{exp.description}</p>
                )}
              </div>
              <button
                onClick={() => removeExperience(i)}
                className="text-red-400 hover:text-red-600 text-xs font-semibold ml-4 mt-0.5"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3 bg-gray-50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Add New Experience
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Role / Title *</label>
            <input
              className={`${inputCls} ${errors.role ? "border-red-400" : ""}`}
              placeholder="Software Engineer"
              value={form.role}
              onChange={(e) => { setForm({ ...form, role: e.target.value }); setErrors({}); }}
            />
            {errors.role && <p className="text-red-500 text-xs mt-0.5">{errors.role}</p>}
          </div>

          <div>
            <label className={labelCls}>Company *</label>
            <input
              className={`${inputCls} ${errors.company ? "border-red-400" : ""}`}
              placeholder="Google"
              value={form.company}
              onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({}); }}
            />
            {errors.company && <p className="text-red-500 text-xs mt-0.5">{errors.company}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Start Date</label>
            <input
              className={inputCls}
              type="month"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>End Date (leave blank if current)</label>
            <input
              className={inputCls}
              type="month"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            className={`${inputCls} resize-none h-24`}
            placeholder="• Describe your responsibilities and achievements..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          + Add Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;