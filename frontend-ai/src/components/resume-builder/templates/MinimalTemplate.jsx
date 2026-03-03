// // components/resume-builder/templates/MinimalTemplate.jsx
// import { formatDate } from "./Templatehelpers";

// const MinimalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
//   const hasSkills = Object.values(skills).some((arr) => arr.length > 0);
//   const allSkills = [
//     ...skills.technical,
//     ...skills.coreSubjects,
//     ...skills.tools,
//     ...skills.communication,
//   ];

//   return (
//     <div className="bg-white text-gray-900 font-serif text-sm leading-relaxed px-10 py-8 space-y-5">
//       <div className="border-b-2 border-gray-900 pb-4">
//         <h1 className="text-4xl font-black tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
//         <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-xs">
//           {personalInfo.email   && <span>{personalInfo.email}</span>}
//           {personalInfo.phone   && <span>{personalInfo.phone}</span>}
//           {personalInfo.address && <span>{personalInfo.address}</span>}
//           {links.github         && <span>{links.github}</span>}
//           {links.linkedin       && <span>{links.linkedin}</span>}
//         </div>
//       </div>

//       {summary && <p className="text-gray-700 italic">{summary}</p>}

//       {experience.length > 0 && (
//         <section>
//           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Experience</h2>
//           {experience.map((exp, i) => (
//             <div key={i} className="mb-3">
//               <div className="flex justify-between">
//                 <span className="font-bold">{exp.role}, <span className="font-normal">{exp.company}</span></span>
//                 <span className="text-xs text-gray-400">{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</span>
//               </div>
//               {exp.description && <p className="text-gray-600 mt-0.5 whitespace-pre-line">{exp.description}</p>}
//             </div>
//           ))}
//         </section>
//       )}

//       {education.length > 0 && (
//         <section>
//           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Education</h2>
//           {education.map((edu, i) => (
//             <div key={i} className="flex justify-between mb-1">
//               <span><span className="font-bold">{edu.degree}</span>, {edu.institution ?? edu.school}</span>
//               <span className="text-xs text-gray-400">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
//             </div>
//           ))}
//         </section>
//       )}

//       {hasSkills && (
//         <section>
//           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Skills</h2>
//           <p className="text-gray-700">{allSkills.join(" · ")}</p>
//         </section>
//       )}

//       {projects.length > 0 && (
//         <section>
//           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Projects</h2>
//           {projects.map((proj, i) => (
//             <div key={i} className="mb-2">
//               <span className="font-bold">{proj.title}</span>
//               {proj.techStack && <span className="text-gray-400 text-xs ml-2">({proj.techStack})</span>}
//               {proj.link && (
//                 <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs ml-2 underline">Link</a>
//               )}
//               <p className="text-gray-600">{proj.description}</p>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// };

// export default MinimalTemplate;


// components/resume-builder/templates/MinimalTemplate.jsx
// Layout inspired by the Thomas Lauren reference:
// - Light gray background
// - Large stacked uppercase name at top
// - Two columns: left sidebar (Contact, Education, Skills) | divider | right (About, Experience, Projects)

const formatDate = (d) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
};

const SectionHeading = ({ children }) => (
  <h2
    className="font-bold uppercase text-gray-800 mb-2 pb-1 border-b border-gray-300"
    style={{ fontSize: "9px", letterSpacing: "0.22em" }}
  >
    {children}
  </h2>
);

const MinimalTemplate = ({
  personalInfo,
  summary,
  experience,
  education,
  skills,
  projects,
  links,
}) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);
  const allSkills = [
    ...skills.technical,
    ...skills.coreSubjects,
    ...skills.tools,
    ...skills.communication,
  ];

  return (
    <div
      className="bg-gray-100 text-gray-900"
      style={{ fontFamily: "'Georgia', serif", fontSize: "11px", lineHeight: "1.55", minHeight: "100%" }}
    >

      {/* ══ TOP — big stacked name ══════════════════════════════════════════ */}
      <div className="px-10 pt-10 pb-7">
        <h1
          className="font-black uppercase text-gray-900 leading-none"
          style={{ fontSize: "30px", letterSpacing: "0.1em" }}
        >
          {personalInfo.fullName
            ? personalInfo.fullName.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))
            : <><span className="block">YOUR</span><span className="block">NAME</span></>
          }
        </h1>
        {/* portfolio field used as job title / subtitle */}
        {personalInfo.portfolio && (
          <p
            className="mt-3 text-gray-500 uppercase"
            style={{ fontSize: "9.5px", letterSpacing: "0.22em" }}
          >
            {personalInfo.portfolio}
          </p>
        )}
      </div>

      {/* ══ TWO COLUMN BODY ════════════════════════════════════════════════ */}
      <div className="flex px-10 pb-10 gap-0">

        {/* ── LEFT SIDEBAR ───────────────────────────────────────────────── */}
        <div className="shrink-0 flex flex-col gap-6" style={{ width: "35%" }}>

          {/* Contact */}
          <section>
            <SectionHeading>Contact</SectionHeading>
            <div className="flex flex-col gap-1 text-gray-600" style={{ fontSize: "11px" }}>
              {personalInfo.phone   && <span>{personalInfo.phone}</span>}
              {personalInfo.email   && <span>{personalInfo.email}</span>}
              {links.linkedin       && <span>{links.linkedin}</span>}
              {links.github         && <span>{links.github}</span>}
              {links.leetcode       && <span>{links.leetcode}</span>}
              {personalInfo.address && (
                <span style={{ lineHeight: "1.4" }}>{personalInfo.address}</span>
              )}
            </div>
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section>
              <SectionHeading>Education</SectionHeading>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p
                      className="font-bold uppercase text-gray-900"
                      style={{ fontSize: "9.5px", letterSpacing: "0.06em", lineHeight: "1.3" }}
                    >
                      {edu.institution}
                    </p>
                    {edu.degree && (
                      <p className="text-gray-600 mt-0.5">{edu.degree}</p>
                    )}
                    <p className="text-gray-400 mt-0.5" style={{ fontSize: "10px" }}>
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {hasSkills && (
            <section>
              <SectionHeading>Skills</SectionHeading>
              <div className="flex flex-col gap-0.5 text-gray-700">
                {allSkills.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── VERTICAL DIVIDER ───────────────────────────────────────────── */}
        <div className="shrink-0 self-stretch" style={{ width: "1px", background: "#d1d5db", marginLeft: "4px", marginRight: "4px" }} />

        {/* ── RIGHT MAIN ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-6" style={{ paddingLeft: "20px" }}>

          {/* About / Summary */}
          {summary && (
            <section>
              <SectionHeading>About</SectionHeading>
              <p className="text-gray-700" style={{ lineHeight: "1.6" }}>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <SectionHeading>Experience</SectionHeading>
              <div className="flex flex-col gap-5">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <p
                      className="font-bold uppercase text-gray-900"
                      style={{ fontSize: "9.5px", letterSpacing: "0.06em" }}
                    >
                      {exp.role}
                    </p>
                    <p className="text-gray-500 mb-1" style={{ fontSize: "10px" }}>
                      {exp.company}
                      {(exp.startDate || exp.endDate) && (
                        <> | {formatDate(exp.startDate)} – {formatDate(exp.endDate)}</>
                      )}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 whitespace-pre-line" style={{ lineHeight: "1.6" }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <SectionHeading>Projects</SectionHeading>
              <div className="flex flex-col gap-5">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between">
                      <p
                        className="font-bold uppercase text-gray-900"
                        style={{ fontSize: "9.5px", letterSpacing: "0.06em" }}
                      >
                        {proj.title}
                      </p>
                      <div className="flex gap-3">
                        {proj.githubLink && (
                          <a href={proj.githubLink} target="_blank" rel="noreferrer"
                            className="text-gray-400 underline" style={{ fontSize: "9px" }}>
                            GitHub
                          </a>
                        )}
                        {proj.liveLink && (
                          <a href={proj.liveLink} target="_blank" rel="noreferrer"
                            className="text-gray-400 underline" style={{ fontSize: "9px" }}>
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.techStack?.length > 0 && (
                      <p className="text-gray-500 mb-1" style={{ fontSize: "10px" }}>
                        {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-gray-700" style={{ lineHeight: "1.6" }}>
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;