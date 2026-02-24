// forms/SummaryForm.jsx
// Fixes: setSummary doesn't exist → use setField("summary", value)
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls =
  "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const SummaryForm = () => {
  const summary = useResumeStore((s) => s.summary);
  const setField = useResumeStore((s) => s.setField);
  const links    = useResumeStore((s) => s.links);
  const updateLinks = useResumeStore((s) => s.updateLinks);

  return (
    <div className="space-y-6">
      {/* ── Summary ── */}
      <div>
        <h3 className="font-bold text-gray-800 text-base mb-3">
          Professional Summary
        </h3>
        <label className={labelCls}>Summary</label>
        <textarea
          className={`${inputCls} resize-none h-32`}
          placeholder="Write 2-4 sentences about your professional background, key skills, and career goals..."
          value={summary}
          onChange={(e) => setField("summary", e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">{summary.length} characters</p>
      </div>

      {/* ── Links ── */}
      <div>
        <h3 className="font-bold text-gray-800 text-base mb-3">Social Links</h3>

        <div className="space-y-3">
          <div>
            <label className={labelCls}>GitHub</label>
            <input
              className={inputCls}
              placeholder="https://github.com/username"
              value={links.github}
              onChange={(e) => updateLinks({ github: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>LinkedIn</label>
            <input
              className={inputCls}
              placeholder="https://linkedin.com/in/username"
              value={links.linkedin}
              onChange={(e) => updateLinks({ linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>LeetCode</label>
            <input
              className={inputCls}
              placeholder="https://leetcode.com/username"
              value={links.leetcode}
              onChange={(e) => updateLinks({ leetcode: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;