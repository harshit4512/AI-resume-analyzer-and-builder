// components/resume-builder/templates/MinimalTemplate.jsx
import { formatDate } from "./templateHelpers";

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
              <span><span className="font-bold">{edu.degree}</span>, {edu.institution ?? edu.school}</span>
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

export default MinimalTemplate;