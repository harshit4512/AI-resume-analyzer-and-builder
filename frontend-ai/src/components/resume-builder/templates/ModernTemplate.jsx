// components/resume-builder/templates/ModernTemplate.jsx
import { formatDate, SkillBadge } from "./templateHelpers";

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
                  <p className="text-gray-600 text-xs">{edu.institution ?? edu.school}</p>
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

export default ModernTemplate;