// // components/resume-builder/templates/ProfessionalTemplate.jsx
// import { formatDate } from "./Templatehelpers";

// const Section = ({ title, children }) => (
//   <section className="mb-5">
//     <h2 className="text-sm font-bold uppercase tracking-widest bg-gray-100 px-3 py-1 text-gray-700 mb-3">{title}</h2>
//     {children}
//   </section>
// );

// const ProfessionalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
//   const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

//   return (
//     <div className="bg-white text-gray-800 text-sm px-8 py-6 font-sans">
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
//         <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs text-gray-500">
//           {personalInfo.email   && <span>{personalInfo.email}</span>}
//           {personalInfo.phone   && <span>{personalInfo.phone}</span>}
//           {personalInfo.address && <span>{personalInfo.address}</span>}
//           {links.github         && <span>{links.github}</span>}
//           {links.linkedin       && <span>{links.linkedin}</span>}
//           {links.leetcode       && <span>{links.leetcode}</span>}
//         </div>
//       </div>

//       {summary && (
//         <Section title="Objective">
//           <p className="text-gray-700 px-3">{summary}</p>
//         </Section>
//       )}

//       {experience.length > 0 && (
//         <Section title="Work Experience">
//           {experience.map((exp, i) => (
//             <div key={i} className="mb-4 px-3">
//               <div className="flex justify-between items-baseline">
//                 <p className="font-bold">{exp.role}</p>
//                 <p className="text-xs text-gray-500">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</p>
//               </div>
//               <p className="text-gray-500 italic text-xs">{exp.company}</p>
//               {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
//             </div>
//           ))}
//         </Section>
//       )}

//       {education.length > 0 && (
//         <Section title="Education">
//           {education.map((edu, i) => (
//             <div key={i} className="mb-3 px-3 flex justify-between items-baseline">
//               <div>
//                 <p className="font-bold">{edu.degree}</p>
//                 <p className="text-gray-500 text-xs">{edu.institution ?? edu.school}</p>
//               </div>
//               <p className="text-xs text-gray-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
//             </div>
//           ))}
//         </Section>
//       )}

//       {hasSkills && (
//         <Section title="Skills">
//           <div className="px-3 space-y-1">
//             {skills.technical.length > 0     && <p><span className="font-semibold">Technical: </span>{skills.technical.join(", ")}</p>}
//             {skills.coreSubjects.length > 0  && <p><span className="font-semibold">Core Subjects: </span>{skills.coreSubjects.join(", ")}</p>}
//             {skills.tools.length > 0         && <p><span className="font-semibold">Tools: </span>{skills.tools.join(", ")}</p>}
//             {skills.communication.length > 0 && <p><span className="font-semibold">Soft Skills: </span>{skills.communication.join(", ")}</p>}
//           </div>
//         </Section>
//       )}

//       {projects.length > 0 && (
//         <Section title="Projects">
//           {projects.map((proj, i) => (
//             <div key={i} className="mb-4 px-3">
//               <div className="flex justify-between items-baseline">
//                 <p className="font-bold">{proj.title}</p>
//                 {proj.link && (
//                   <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline">View Project</a>
//                 )}
//               </div>
//               {proj.techStack && <p className="text-xs text-gray-500 italic">{proj.techStack}</p>}
//               <p className="text-gray-700 mt-1">{proj.description}</p>
//             </div>
//           ))}
//         </Section>
//       )}
//     </div>
//   );
// };

// export default ProfessionalTemplate;

// components/resume-builder/templates/ProfessionalTemplate.jsx


// components/resume-builder/templates/ProfessionalTemplate.jsx
import { formatDate } from "./Templatehelpers";

const Section = ({ title, children }) => (
  <section style={{ marginBottom: "20px" }}>
    <h2 style={{
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      background: "#f3f4f6",
      padding: "4px 12px",
      color: "#374151",
      marginBottom: "12px",
    }}>
      {title}
    </h2>
    {children}
  </section>
);

const ProfessionalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

  return (
    <div style={{
      background: "#fff",
      color: "#1f2937",
      fontSize: "13px",
      padding: "24px 32px",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", margin: "0 0 8px" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", fontSize: "11px", color: "#6b7280" }}>
          {personalInfo.email   && <span>{personalInfo.email}</span>}
          {personalInfo.phone   && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {links.github         && <span>{links.github}</span>}
          {links.linkedin       && <span>{links.linkedin}</span>}
          {links.leetcode       && <span>{links.leetcode}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Objective">
          <p style={{ color: "#374151", padding: "0 12px" }}>{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "16px", padding: "0 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: "700", margin: 0 }}>{exp.role}</p>
                <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate) || "Present"}
                </p>
              </div>
              <p style={{ color: "#6b7280", fontStyle: "italic", fontSize: "11px", margin: "2px 0" }}>{exp.company}</p>
              {exp.description && (
                <p style={{ marginTop: "4px", color: "#374151", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "12px", padding: "0 12px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <p style={{ fontWeight: "700", margin: 0 }}>{edu.degree}</p>
                <p style={{ color: "#6b7280", fontSize: "11px", margin: "2px 0" }}>{edu.institution ?? edu.school}</p>
              </div>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate) || "Present"}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {hasSkills && (
        <Section title="Skills">
          <div style={{ padding: "0 12px", lineHeight: 1.8 }}>
            {skills.technical.length > 0     && <p style={{ margin: "2px 0" }}><strong>Technical: </strong>{skills.technical.join(", ")}</p>}
            {skills.coreSubjects.length > 0  && <p style={{ margin: "2px 0" }}><strong>Core Subjects: </strong>{skills.coreSubjects.join(", ")}</p>}
            {skills.tools.length > 0         && <p style={{ margin: "2px 0" }}><strong>Tools: </strong>{skills.tools.join(", ")}</p>}
            {skills.communication.length > 0 && <p style={{ margin: "2px 0" }}><strong>Soft Skills: </strong>{skills.communication.join(", ")}</p>}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "16px", padding: "0 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontWeight: "700", margin: 0 }}>{proj.title}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer"
                      style={{ color: "#3b82f6", fontSize: "11px", textDecoration: "underline" }}>
                      GitHub →
                    </a>
                  )}
                  {proj.liveLink && (
                    <a href={proj.liveLink} target="_blank" rel="noreferrer"
                      style={{ color: "#3b82f6", fontSize: "11px", textDecoration: "underline" }}>
                      Live →
                    </a>
                  )}
                </div>
              </div>
              {proj.techStack && proj.techStack.length > 0 && (
                <p style={{ fontSize: "11px", color: "#6b7280", fontStyle: "italic", margin: "2px 0" }}>
                  {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                </p>
              )}
              {proj.description && (
                <p style={{ color: "#374151", marginTop: "4px", lineHeight: 1.6 }}>{proj.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;