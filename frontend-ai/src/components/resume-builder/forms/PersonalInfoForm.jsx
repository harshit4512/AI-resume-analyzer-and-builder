import { useResumeStore } from "../../../store/resumeStore.js";
const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-gray-50 transition-colors placeholder-gray-400";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

const PersonalInfoForm = () => {
  const { title, personalInfo, template, setField, updatePersonalInfo } = useResumeStore();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Resume Title <span className="text-red-400">*</span></label>
          <input className={inputCls} placeholder="e.g. Frontend Developer Resume" value={title} onChange={(e) => setField("title", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Template</label>
          <select className={inputCls} value={template} onChange={(e) => setField("template", e.target.value)}>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
        <input className={inputCls} placeholder="John Doe" value={personalInfo.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Email <span className="text-red-400">*</span></label>
          <input className={inputCls} type="email" placeholder="john@example.com" value={personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} placeholder="+91 9876543210" value={personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Address</label>
        <input className={inputCls} placeholder="City, State, Country" value={personalInfo.address} onChange={(e) => updatePersonalInfo({ address: e.target.value })} />
      </div>
      <div>
        <label className={labelCls}>Portfolio URL</label>
        <input className={inputCls} placeholder="https://yourportfolio.com" value={personalInfo.portfolio} onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })} />
      </div>
    </div>
  );
};
export default PersonalInfoForm;