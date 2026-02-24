// forms/PersonalInfoForm.jsx
import { useResumeStore } from "../../../store/resumeStore.js";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

const PersonalInfoForm = () => {
  const { title, personalInfo, template, setField, updatePersonalInfo } =
    useResumeStore();

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800 text-base">Personal Info</h3>

      {/* Resume title + template selector */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Resume Title *</label>
          <input
            className={inputCls}
            placeholder="e.g. Frontend Developer Resume"
            value={title}
            onChange={(e) => setField("title", e.target.value)}
          />
        </div>

        <div>
          <label className={labelCls}>Template</label>
          <select
            className={inputCls}
            value={template}
            onChange={(e) => setField("template", e.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Full Name *</label>
        <input
          className={inputCls}
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Email *</label>
          <input
            className={inputCls}
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input
            className={inputCls}
            placeholder="+91 9876543210"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Address</label>
        <input
          className={inputCls}
          placeholder="City, State, Country"
          value={personalInfo.address}
          onChange={(e) => updatePersonalInfo({ address: e.target.value })}
        />
      </div>

      <div>
        <label className={labelCls}>Portfolio URL</label>
        <input
          className={inputCls}
          placeholder="https://yourportfolio.com"
          value={personalInfo.portfolio}
          onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;