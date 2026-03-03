import { useResumeStore } from "../../../store/resumeStore.js";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

const SummaryForm = () => {
  const summary = useResumeStore((s) => s.summary);
  const setField = useResumeStore((s) => s.setField);
  const links = useResumeStore((s) => s.links);
  const updateLinks = useResumeStore((s) => s.updateLinks);
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Professional Summary</label>
        <textarea className={`${inputCls} resize-none h-32`} placeholder="Write 2-4 sentences about your background, key skills, and goals..." value={summary} onChange={(e) => setField("summary", e.target.value)} />
        <p className="text-xs text-gray-400 mt-1 text-right">{summary.length} characters</p>
      </div>
      <div className="border-t border-gray-100" />
      <div>
        <p className={labelCls}>Social Links</p>
        <div className="space-y-3">
          {[
            { key: "github",   label: "GitHub",   icon: "🐙", placeholder: "https://github.com/username" },
            { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://linkedin.com/in/username" },
            { key: "leetcode", label: "LeetCode", icon: "⚡", placeholder: "https://leetcode.com/username" },
          ].map(({ key, label, icon, placeholder }) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{icon}</span>
                <input className={`${inputCls} pl-9`} placeholder={placeholder} value={links[key]} onChange={(e) => updateLinks({ [key]: e.target.value })} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SummaryForm;