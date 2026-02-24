// forms/ProjectsForm.jsx
// Fixes: setProjects doesn't exist → use addProject / removeProject / updateProject
// Field contract: { title, techStack, description, link }
import { useState } from "react";
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls =
  "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const EMPTY = { title: "", techStack: "", description: "", link: "" };

const ProjectsForm = () => {
  const projects      = useResumeStore((s) => s.projects);
  const addProject    = useResumeStore((s) => s.addProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  const [form, setForm]   = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Project title is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    addProject({ ...form });
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-gray-800 text-base">Projects</h3>

      {/* Saved entries */}
      {projects.length > 0 && (
        <div className="space-y-2">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="flex justify-between items-start bg-purple-50 border border-purple-200 rounded-lg px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">{proj.title}</p>
                {proj.techStack && (
                  <p className="text-xs text-purple-600 font-medium mt-0.5">{proj.techStack}</p>
                )}
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-500 underline mt-0.5 inline-block truncate max-w-full"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
              <button
                onClick={() => removeProject(i)}
                className="text-red-400 hover:text-red-600 text-xs font-semibold ml-4 mt-0.5 whitespace-nowrap"
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
          Add New Project
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Project Title *</label>
            <input
              className={`${inputCls} ${errors.title ? "border-red-400" : ""}`}
              placeholder="Portfolio Website"
              value={form.title}
              onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({}); }}
            />
            {errors.title && <p className="text-red-500 text-xs mt-0.5">{errors.title}</p>}
          </div>

          <div>
            <label className={labelCls}>Tech Stack</label>
            <input
              className={inputCls}
              placeholder="React, Node.js, MongoDB"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description *</label>
          <textarea
            className={`${inputCls} resize-none h-20 ${errors.description ? "border-red-400" : ""}`}
            placeholder="Briefly describe what the project does and your role..."
            value={form.description}
            onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({}); }}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-0.5">{errors.description}</p>
          )}
        </div>

        <div>
          <label className={labelCls}>Live Link / GitHub URL</label>
          <input
            className={inputCls}
            placeholder="https://github.com/you/project"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;