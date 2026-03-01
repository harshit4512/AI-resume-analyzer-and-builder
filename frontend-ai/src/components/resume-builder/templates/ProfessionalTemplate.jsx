// components/resume-builder/templates/ProfessionalTemplate.jsx
import { formatDate } from "./templateHelpers";

const Section = ({ title, children }) => (
  <section className="mb-5">
    <h2 className="text-sm font-bold uppercase tracking-widest bg-gray-100 px-3 py-1 text-gray-700 mb-3">{title}</h2>
    {children}
  </section>
);

const ProfessionalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

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
                <p className="text-gray-500 text-xs">{edu.institution ?? edu.school}</p>
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

export default ProfessionalTemplate;