// forms/EducationForm.jsx
// Fixes: was using "institution" but preview expects "school"
// Field contract: { degree, school, startDate, endDate }
import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls =
  "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const EMPTY = { degree: "", school: "", startDate: "", endDate: "" };

const EducationForm = () => {
  const education      = useResumeStore((s) => s.education);
  const addEducation   = useResumeStore((s) => s.addEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  const [form, setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.degree.trim())  e.degree = "Degree is required";
    if (!form.school.trim())  e.school = "School / Institution is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addEducation({ ...form });
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-gray-800 text-base">Education</h3>

      {/* Saved entries */}
      {education.length > 0 && (
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex justify-between items-start bg-blue-50 border border-blue-200 rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-semibold text-sm text-gray-800">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-400">
                  {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : "– Present"}
                </p>
              </div>
              <button
                onClick={() => removeEducation(i)}
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
          Add New Education
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Degree *</label>
            <input
              className={`${inputCls} ${errors.degree ? "border-red-400" : ""}`}
              placeholder="B.Tech Computer Science"
              value={form.degree}
              onChange={(e) => { setForm({ ...form, degree: e.target.value }); setErrors({}); }}
            />
            {errors.degree && <p className="text-red-500 text-xs mt-0.5">{errors.degree}</p>}
          </div>

          <div>
            <label className={labelCls}>School / Institution *</label>
            <input
              className={`${inputCls} ${errors.school ? "border-red-400" : ""}`}
              placeholder="IIT Bombay"
              value={form.school}
              onChange={(e) => { setForm({ ...form, school: e.target.value }); setErrors({}); }}
            />
            {errors.school && <p className="text-red-500 text-xs mt-0.5">{errors.school}</p>}
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

        <button
          onClick={handleAdd}
          className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;