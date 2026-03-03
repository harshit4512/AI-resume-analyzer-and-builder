import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";
const EMPTY = { title: "", techStack: "", description: "", githubLink: "", liveLink: "" };

const ProjectsForm = () => {
  const projects = useResumeStore((s) => s.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const removeProject = useResumeStore((s) => s.removeProject);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Project title is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };
  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addProject({ ...form });
    setForm(EMPTY); setErrors({});
  };

  return (
    <div className="space-y-4">
      {projects.length > 0 && (
        <div className="space-y-2">
          {projects.map((proj, i) => (
            <div key={i} className="flex justify-between items-start bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">{proj.title}</p>
                {proj.techStack && <p className="text-xs text-green-600 font-medium mt-0.5">{proj.techStack}</p>}
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{proj.description}</p>
                <div className="flex gap-3 mt-1">
                  {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline truncate max-w-[140px]">GitHub</a>}
                  {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs text-green-500 underline truncate max-w-[140px]">Live</a>}
                </div>
              </div>
              <button onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600 text-xs font-bold ml-4 mt-0.5 transition-colors whitespace-nowrap shrink-0">Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3 bg-gray-50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Add Project</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Project Title <span className="text-red-400">*</span></label>
            <input className={`${inputCls} ${errors.title ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="Portfolio Website" value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({}); }} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className={labelCls}>Tech Stack</label>
            <input className={inputCls} placeholder="React, Node.js, MongoDB" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description <span className="text-red-400">*</span></label>
          <textarea className={`${inputCls} resize-none h-20 ${errors.description ? "border-red-400 ring-2 ring-red-100" : ""}`} placeholder="Briefly describe what the project does and your role..." value={form.description} onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({}); }} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>GitHub Link</label>
            <input className={inputCls} placeholder="https://github.com/you/project" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Live Link</label>
            <input className={inputCls} placeholder="https://yourproject.com" value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })} />
          </div>
        </div>
        <button onClick={handleAdd} className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-green-200">
          + Add Project
        </button>
      </div>
    </div>
  );
};
export default ProjectsForm;
