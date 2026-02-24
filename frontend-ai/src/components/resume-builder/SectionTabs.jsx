// components/SectionTabs.jsx
import { useState } from "react";
import PersonalInfoForm from "./forms/PersonalInfoForm.jsx";
import SummaryForm      from "./forms/SummaryForm.jsx";
import SkillsForm       from "./forms/SkillsForm.jsx";
import EducationForm    from "./forms/EducationForm.jsx";
import ExperienceForm   from "./forms/ExperienceForm.jsx";
import ProjectsForm     from "./forms/ProjectsForm.jsx";

const TABS = [
  { id: "personal",   label: "👤 Personal"   },
  { id: "summary",    label: "📝 Summary"    },
  { id: "skills",     label: "🛠 Skills"     },
  { id: "education",  label: "🎓 Education"  },
  { id: "experience", label: "💼 Experience" },
  { id: "projects",   label: "🚀 Projects"   },
];

const FORM_MAP = {
  personal:   <PersonalInfoForm />,
  summary:    <SummaryForm />,
  skills:     <SkillsForm />,
  education:  <EducationForm />,
  experience: <ExperienceForm />,
  projects:   <ProjectsForm />,
};

const SectionTabs = () => {
  const [active, setActive] = useState("personal");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              active === tab.id
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        {FORM_MAP[active]}
      </div>
    </div>
  );
};

export default SectionTabs;