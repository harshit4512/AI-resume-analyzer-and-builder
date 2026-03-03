import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
const EMPTY = { degree: "", school: "", startDate: "", endDate: "" };

const EducationForm = () => {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.degree.trim()) e.degree = "Degree is required";
    if (!form.school.trim()) e.school = "School is required";
    return e;
  };
  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addEducation({ ...form });
    setForm(EMPTY); setErrors({});
  };

  return (
    <div className="space-y-4">
      {/* Saved entries */}
      {education.length > 0 && (
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-sm text-gray-800">{edu.degree}</p>
                <p className="text-xs text-gray-500 mt-0.5">{edu.school}</p>
                <p className="text-xs text-gray-400 mt-0.5">{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : "– Present"}</p>
              </div>
              <button onClick={() => removeEducation(i)} className="text-red-400 hover:text-red-600 text-xs font-bold ml-4 mt-0.5 transition-colors">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3 bg-gray-50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Add Education</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Degree <span className="text-red-400">*</span></label>
            <input className={`${inputCls} ${errors.degree ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="B.Tech Computer Science" value={form.degree} onChange={(e) => { setForm({ ...form, degree: e.target.value }); setErrors({}); }} />
            {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
          </div>
          <div>
            <label className={labelCls}>School / Institution <span className="text-red-400">*</span></label>
            <input className={`${inputCls} ${errors.school ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="IIT Bombay" value={form.school} onChange={(e) => { setForm({ ...form, school: e.target.value }); setErrors({}); }} />
            {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
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
        <button onClick={handleAdd} className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-green-200">
          + Add Education
        </button>
      </div>
    </div>
  );
};
export default EducationForm;