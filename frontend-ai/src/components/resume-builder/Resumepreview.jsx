// components/ResumePreview.jsx
// Fix: was using useResumeStore((s) => ({ ...object })) which returns a NEW object
// reference every render → Zustand's getSnapshot sees a changed value every time →
// infinite loop.
// Fix: select each field individually with separate useResumeStore calls.

import { useResumeStore } from "../../store/resumeStore.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (d) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
};

const SkillBadge = ({ label, className }) => (
  <span className={`px-2.5 py-1 rounded text-xs font-medium ${className}`}>{label}</span>
);

// ─── Template: Modern ────────────────────────────────────────────────────────

const ModernTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

  return (
    <div className="bg-white text-gray-800 font-sans text-sm leading-relaxed">
      <div className="bg-blue-700 text-white px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-blue-100 text-xs">
          {personalInfo.email     && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone     && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.address   && <span>📍 {personalInfo.address}</span>}
          {personalInfo.portfolio && <span>🌐 {personalInfo.portfolio}</span>}
          {links.github           && <span>GitHub: {links.github}</span>}
          {links.linkedin         && <span>LinkedIn: {links.linkedin}</span>}
          {links.leetcode         && <span>LeetCode: {links.leetcode}</span>}
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {summary && (
          <section>
            <h2 className="text-blue-700 font-bold text-base uppercase tracking-widest border-b border-blue-200 pb-1 mb-2">Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-blue-700 font-bold text-base uppercase tracking-widest border-b border-blue-200 pb-1 mb-3">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-gray-900">{exp.role}</p>
                  <p className="text-xs text-gray-500">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</p>
                </div>
                <p className="text-blue-600 text-xs font-semibold">{exp.company}</p>
                {exp.description && <p className="text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-blue-700 font-bold text-base uppercase tracking-widest border-b border-blue-200 pb-1 mb-3">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 flex justify-between items-baseline">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600 text-xs">{edu.school}</p>
                </div>
                <p className="text-xs text-gray-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </section>
        )}

        {hasSkills && (
          <section>
            <h2 className="text-blue-700 font-bold text-base uppercase tracking-widest border-b border-blue-200 pb-1 mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.technical.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-1">Technical:</span>
                  {skills.technical.map((s, i) => <SkillBadge key={i} label={s} className="bg-blue-100 text-blue-800" />)}
                </div>
              )}
              {skills.coreSubjects.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-1">Core:</span>
                  {skills.coreSubjects.map((s, i) => <SkillBadge key={i} label={s} className="bg-green-100 text-green-800" />)}
                </div>
              )}
              {skills.tools.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-1">Tools:</span>
                  {skills.tools.map((s, i) => <SkillBadge key={i} label={s} className="bg-yellow-100 text-yellow-800" />)}
                </div>
              )}
              {skills.communication.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-1">Soft:</span>
                  {skills.communication.map((s, i) => <SkillBadge key={i} label={s} className="bg-pink-100 text-pink-800" />)}
                </div>
              )}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-blue-700 font-bold text-base uppercase tracking-widest border-b border-blue-200 pb-1 mb-3">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-gray-900">{proj.title}</p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline">View →</a>
                  )}
                </div>
                {proj.techStack && <p className="text-xs text-purple-600 font-medium">{proj.techStack}</p>}
                <p className="text-gray-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

// ─── Template: Minimal ───────────────────────────────────────────────────────

const MinimalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);
  const allSkills = [
    ...skills.technical,
    ...skills.coreSubjects,
    ...skills.tools,
    ...skills.communication,
  ];

  return (
    <div className="bg-white text-gray-900 font-serif text-sm leading-relaxed px-10 py-8 space-y-5">
      <div className="border-b-2 border-gray-900 pb-4">
        <h1 className="text-4xl font-black tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-xs">
          {personalInfo.email   && <span>{personalInfo.email}</span>}
          {personalInfo.phone   && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {links.github         && <span>{links.github}</span>}
          {links.linkedin       && <span>{links.linkedin}</span>}
        </div>
      </div>

      {summary && <p className="text-gray-700 italic">{summary}</p>}

      {experience.length > 0 && (
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.role}, <span className="font-normal">{exp.company}</span></span>
                <span className="text-xs text-gray-400">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</span>
              </div>
              {exp.description && <p className="text-gray-600 mt-0.5 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-1">
              <span><span className="font-bold">{edu.degree}</span>, {edu.school}</span>
              <span className="text-xs text-gray-400">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
            </div>
          ))}
        </section>
      )}

      {hasSkills && (
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Skills</h2>
          <p className="text-gray-700">{allSkills.join(" · ")}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <span className="font-bold">{proj.title}</span>
              {proj.techStack && <span className="text-gray-400 text-xs ml-2">({proj.techStack})</span>}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs ml-2 underline">Link</a>
              )}
              <p className="text-gray-600">{proj.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ─── Template: Classic ───────────────────────────────────────────────────────

const ClassicTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

  const Section = ({ title, children }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest bg-gray-100 px-3 py-1 text-gray-700 mb-3">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 text-sm px-8 py-6 font-sans">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-gray-500">
          {personalInfo.email   && <span>{personalInfo.email}</span>}
          {personalInfo.phone   && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {links.github         && <span>{links.github}</span>}
          {links.linkedin       && <span>{links.linkedin}</span>}
          {links.leetcode       && <span>{links.leetcode}</span>}
        </div>
      </div>

      {summary && (
        <Section title="Objective">
          <p className="text-gray-700 px-3">{summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((exp, i) => (
            <div key={i} className="mb-4 px-3">
              <div className="flex justify-between items-baseline">
                <p className="font-bold">{exp.role}</p>
                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</p>
              </div>
              <p className="text-gray-500 italic text-xs">{exp.company}</p>
              {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="mb-3 px-3 flex justify-between items-baseline">
              <div>
                <p className="font-bold">{edu.degree}</p>
                <p className="text-gray-500 text-xs">{edu.school}</p>
              </div>
              <p className="text-xs text-gray-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </Section>
      )}

      {hasSkills && (
        <Section title="Skills">
          <div className="px-3 space-y-1">
            {skills.technical.length > 0     && <p><span className="font-semibold">Technical: </span>{skills.technical.join(", ")}</p>}
            {skills.coreSubjects.length > 0  && <p><span className="font-semibold">Core Subjects: </span>{skills.coreSubjects.join(", ")}</p>}
            {skills.tools.length > 0         && <p><span className="font-semibold">Tools: </span>{skills.tools.join(", ")}</p>}
            {skills.communication.length > 0 && <p><span className="font-semibold">Soft Skills: </span>{skills.communication.join(", ")}</p>}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-4 px-3">
              <div className="flex justify-between items-baseline">
                <p className="font-bold">{proj.title}</p>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline">View Project</a>
                )}
              </div>
              {proj.techStack && <p className="text-xs text-gray-500 italic">{proj.techStack}</p>}
              <p className="text-gray-700 mt-1">{proj.description}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

// ─── Template map ─────────────────────────────────────────────────────────────

const TEMPLATES = {
  modern:  ModernTemplate,
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
};

// ─── Main export ──────────────────────────────────────────────────────────────

const ResumePreview = () => {
  // ✅ Each selector returns a primitive or stable store reference — no new
  // object literals — so Zustand's getSnapshot never sees a false change.
  const template    = useResumeStore((s) => s.template);
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const summary     = useResumeStore((s) => s.summary);
  const experience  = useResumeStore((s) => s.experience);
  const education   = useResumeStore((s) => s.education);
  const skills      = useResumeStore((s) => s.skills);
  const projects    = useResumeStore((s) => s.projects);
  const links       = useResumeStore((s) => s.links);

  const Template = TEMPLATES[template] ?? ModernTemplate;

  return (
    <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 min-h-[800px]">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white text-xs">
        <span className="font-semibold uppercase tracking-wide">Preview</span>
        <span className="bg-gray-600 px-2 py-0.5 rounded text-gray-200 capitalize">
          Template: <strong>{template}</strong>
        </span>
      </div>

      <Template
        personalInfo={personalInfo}
        summary={summary}
        experience={experience}
        education={education}
        skills={skills}
        projects={projects}
        links={links}
      />
    </div>
  );
};

export default ResumePreview;




