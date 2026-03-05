// // components/resume-builder/templates/ModernTemplate.jsx
// import { formatDate, SkillBadge } from "./Templatehelpers";

// const ModernTemplate = ({
//   personalInfo,
//   summary,
//   experience,
//   education,
//   skills,
//   projects,
//   links,
// }) => {
//   const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

//   return (
//     <div
//       style={{
//         fontFamily: "'Georgia', serif",
//         fontSize: "11px",
//         color: "#222",
//         background: "#fff",
//         display: "flex",
//         minHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {/* ── LEFT SIDEBAR (dark) ── */}
//       <div
//         style={{
//           width: "36%",
//           background: "#2b2b2b",
//           color: "#fff",
//           padding: "32px 24px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "24px",
//           flexShrink: 0,
//         }}
//       >
//         {/* Name + title */}
//         <div style={{ borderBottom: "2px solid #555", paddingBottom: "16px" }}>
//           <h1
//             style={{
//               fontSize: "26px",
//               fontWeight: "900",
//               lineHeight: 1.1,
//               margin: 0,
//               letterSpacing: "-0.5px",
//               fontFamily: "'Georgia', serif",
//             }}
//           >
//             {personalInfo.fullName
//               ? personalInfo.fullName.split(" ").map((word, i) => (
//                   <span key={i} style={{ display: "block" }}>
//                     {word}
//                   </span>
//                 ))
//               : "Your Name"}
//           </h1>
//           {personalInfo.portfolio && (
//             <p
//               style={{
//                 color: "#aaa",
//                 fontSize: "10px",
//                 marginTop: "6px",
//                 fontStyle: "italic",
//               }}
//             >
//               {personalInfo.portfolio}
//             </p>
//           )}
//           {/* Social links row */}
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               marginTop: "10px",
//               flexWrap: "wrap",
//             }}
//           >
//             {links.linkedin && (
//               <span style={{ fontSize: "10px", color: "#bbb" }}>
//                 in {links.linkedin}
//               </span>
//             )}
//             {links.github && (
//               <span style={{ fontSize: "10px", color: "#bbb" }}>
//                 ⌥ {links.github}
//               </span>
//             )}
//             {links.leetcode && (
//               <span style={{ fontSize: "10px", color: "#bbb" }}>
//                 ◈ {links.leetcode}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Contact */}
//         <div>
//           <SidebarHeading>Contact</SidebarHeading>
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//             {personalInfo.email && (
//               <SidebarContact label="Email" value={personalInfo.email} />
//             )}
//             {personalInfo.phone && (
//               <SidebarContact label="Phone" value={personalInfo.phone} />
//             )}
//             {personalInfo.address && (
//               <SidebarContact label="Address" value={personalInfo.address} />
//             )}
//           </div>
//         </div>

//         {/* Skills */}
//         {hasSkills && (
//           <div>
//             <SidebarHeading>Skills</SidebarHeading>
//             <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//               {skills.technical.length > 0 && (
//                 <SkillGroup label="Technical" items={skills.technical} />
//               )}
//               {skills.tools.length > 0 && (
//                 <SkillGroup label="Tools" items={skills.tools} />
//               )}
//               {skills.coreSubjects.length > 0 && (
//                 <SkillGroup label="Core" items={skills.coreSubjects} />
//               )}
//               {skills.communication.length > 0 && (
//                 <SkillGroup label="Soft Skills" items={skills.communication} />
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── RIGHT CONTENT (white) ── */}
//       <div
//         style={{
//           flex: 1,
//           padding: "32px 28px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "22px",
//         }}
//       >
//         {/* Profile / Summary */}
//         {summary && (
//           <section>
//             <ContentHeading>Profile</ContentHeading>
//             <p style={{ color: "#444", lineHeight: 1.7, marginTop: "8px" }}>
//               {summary}
//             </p>
//           </section>
//         )}

//         {/* Experience */}
//         {experience.length > 0 && (
//           <section>
//             <ContentHeading>Experience</ContentHeading>
//             <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
//               {experience.map((exp, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1.6fr",
//                     gap: "12px",
//                     paddingBottom: "12px",
//                     borderBottom: i < experience.length - 1 ? "1px solid #eee" : "none",
//                   }}
//                 >
//                   {/* Left: role, dates, company */}
//                   <div>
//                     <p style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>
//                       {exp.role}
//                     </p>
//                     <p style={{ color: "#888", fontSize: "10px", marginBottom: "2px" }}>
//                       {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
//                     </p>
//                     <p style={{ color: "#555", fontSize: "10px", fontStyle: "italic" }}>
//                       {exp.company}
//                     </p>
//                   </div>
//                   {/* Right: description */}
//                   <div>
//                     {exp.description && (
//                       <p style={{ color: "#555", lineHeight: 1.6, whiteSpace: "pre-line" }}>
//                         {exp.description}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Education */}
//         {education.length > 0 && (
//           <section>
//             <ContentHeading>Education</ContentHeading>
//             <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
//               {education.map((edu, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1.6fr",
//                     gap: "12px",
//                     paddingBottom: "12px",
//                     borderBottom: i < education.length - 1 ? "1px solid #eee" : "none",
//                   }}
//                 >
//                   <div>
//                     <p style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>
//                       {edu.institution ?? edu.school}
//                     </p>
//                     <p style={{ color: "#888", fontSize: "10px", marginBottom: "2px" }}>
//                       {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
//                     </p>
//                     <p style={{ color: "#555", fontSize: "10px", fontStyle: "italic" }}>
//                       {edu.degree}
//                     </p>
//                   </div>
//                   <div />
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Projects */}
//         {projects.length > 0 && (
//           <section>
//             <ContentHeading>Projects</ContentHeading>
//             <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
//               {projects.map((proj, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1.6fr",
//                     gap: "12px",
//                     paddingBottom: "12px",
//                     borderBottom: i < projects.length - 1 ? "1px solid #eee" : "none",
//                   }}
//                 >
//                   <div>
//                     <p style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>
//                       {proj.title}
//                     </p>
//                     {proj.techStack && proj.techStack.length > 0 && (
//                       <p style={{ color: "#888", fontSize: "10px", fontStyle: "italic" }}>
//                         {Array.isArray(proj.techStack)
//                           ? proj.techStack.join(", ")
//                           : proj.techStack}
//                       </p>
//                     )}
//                     <div style={{ display: "flex", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
//                       {proj.githubLink && (
//                         <a
//                           href={proj.githubLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           style={{ color: "#555", fontSize: "9px", textDecoration: "underline" }}
//                         >
//                           GitHub →
//                         </a>
//                       )}
//                       {proj.liveLink && (
//                         <a
//                           href={proj.liveLink}
//                           target="_blank"
//                           rel="noreferrer"
//                           style={{ color: "#555", fontSize: "9px", textDecoration: "underline" }}
//                         >
//                           Live →
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     {proj.description && (
//                       <p style={{ color: "#555", lineHeight: 1.6 }}>{proj.description}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ── Small helper components ── */

// const SidebarHeading = ({ children }) => (
//   <div style={{ marginBottom: "10px" }}>
//     <h2
//       style={{
//         fontSize: "13px",
//         fontWeight: "900",
//         color: "#fff",
//         letterSpacing: "0.02em",
//         margin: 0,
//         fontFamily: "'Georgia', serif",
//       }}
//     >
//       {children}
//     </h2>
//     <div
//       style={{
//         width: "28px",
//         height: "2px",
//         background: "#777",
//         marginTop: "4px",
//       }}
//     />
//   </div>
// );

// const SidebarContact = ({ label, value }) => (
//   <div>
//     <p style={{ color: "#aaa", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
//       {label}:
//     </p>
//     <p style={{ color: "#ddd", fontSize: "10px", margin: "1px 0 0", wordBreak: "break-all" }}>
//       {value}
//     </p>
//   </div>
// );

// const SkillGroup = ({ label, items }) => (
//   <div>
//     <p
//       style={{
//         color: "#aaa",
//         fontSize: "9px",
//         textTransform: "uppercase",
//         letterSpacing: "0.08em",
//         marginBottom: "5px",
//       }}
//     >
//       {label}
//     </p>
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//       {items.map((s, i) => (
//         <span
//           key={i}
//           style={{
//             background: "#444",
//             color: "#eee",
//             fontSize: "9px",
//             padding: "2px 7px",
//             borderRadius: "3px",
//           }}
//         >
//           {s}
//         </span>
//       ))}
//     </div>
//   </div>
// );

// const ContentHeading = ({ children }) => (
//   <div style={{ marginBottom: "2px" }}>
//     <h2
//       style={{
//         fontSize: "16px",
//         fontWeight: "900",
//         color: "#111",
//         margin: 0,
//         fontFamily: "'Georgia', serif",
//         letterSpacing: "-0.3px",
//       }}
//     >
//       {children}
//     </h2>
//     <div
//       style={{
//         width: "32px",
//         height: "2.5px",
//         background: "#2b2b2b",
//         marginTop: "4px",
//       }}
//     />
//   </div>
// );

// export default ModernTemplate;


// components/resume-builder/templates/ModernTemplate.jsx
import { formatDate } from "./Templatehelpers";

const ModernTemplate = ({
  personalInfo,
  summary,
  experience,
  education,
  skills,
  projects,
  links,
}) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);

  return (
    <div style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "#222", background: "#fff", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minHeight: "100%" }}>
        <tbody>
          <tr>

            {/* ── LEFT SIDEBAR ── */}
            <td
              style={{
                width: "36%",
                background: "#2b2b2b",
                color: "#fff",
                padding: "32px 20px",
                verticalAlign: "top",
              }}
            >

              {/* Name */}
              <div style={{ borderBottom: "2px solid #555", paddingBottom: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "24px", fontWeight: "900", lineHeight: 1.15, letterSpacing: "-0.5px", fontFamily: "Georgia, serif" }}>
                  {personalInfo.fullName
                    ? personalInfo.fullName.split(" ").map((word, i) => (
                        <div key={i}>{word}</div>
                      ))
                    : <div>Your Name</div>}
                </div>

                {personalInfo.portfolio && (
                  <div style={{ color: "#aaa", fontSize: "10px", marginTop: "6px", fontStyle: "italic" }}>
                    {personalInfo.portfolio}
                  </div>
                )}

                {/* Social links */}
                <div style={{ marginTop: "10px" }}>
                  {links.linkedin && (
                    <div style={{ fontSize: "10px", color: "#bbb", marginBottom: "3px" }}>in {links.linkedin}</div>
                  )}
                  {links.github && (
                    <div style={{ fontSize: "10px", color: "#bbb", marginBottom: "3px" }}>gh {links.github}</div>
                  )}
                  {links.leetcode && (
                    <div style={{ fontSize: "10px", color: "#bbb", marginBottom: "3px" }}>lc {links.leetcode}</div>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div style={{ marginBottom: "20px" }}>
                <SidebarHeading>Contact</SidebarHeading>
                {personalInfo.email && <SidebarContact label="Email" value={personalInfo.email} />}
                {personalInfo.phone && <SidebarContact label="Phone" value={personalInfo.phone} />}
                {personalInfo.address && <SidebarContact label="Address" value={personalInfo.address} />}
              </div>

              {/* Skills */}
              {hasSkills && (
                <div>
                  <SidebarHeading>Skills</SidebarHeading>
                  {skills.technical.length > 0 && <SkillGroup label="Technical" items={skills.technical} />}
                  {skills.tools.length > 0 && <SkillGroup label="Tools" items={skills.tools} />}
                  {skills.coreSubjects.length > 0 && <SkillGroup label="Core" items={skills.coreSubjects} />}
                  {skills.communication.length > 0 && <SkillGroup label="Soft Skills" items={skills.communication} />}
                </div>
              )}
            </td>

            {/* ── RIGHT CONTENT ── */}
            <td style={{ padding: "32px 26px", verticalAlign: "top", background: "#fff" }}>

              {/* Summary */}
              {summary && (
                <div style={{ marginBottom: "20px" }}>
                  <ContentHeading>Profile</ContentHeading>
                  <div style={{ color: "#444", lineHeight: 1.7, marginTop: "8px" }}>{summary}</div>
                </div>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <ContentHeading>Experience</ContentHeading>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <tbody>
                      {experience.map((exp, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              width: "38%",
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              paddingRight: "12px",
                              borderBottom: i < experience.length - 1 ? "1px solid #eee" : "none",
                            }}
                          >
                            <div style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>{exp.role}</div>
                            <div style={{ color: "#888", fontSize: "10px", marginBottom: "2px" }}>
                              {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                            </div>
                            <div style={{ color: "#555", fontSize: "10px", fontStyle: "italic" }}>{exp.company}</div>
                          </td>
                          <td
                            style={{
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              borderBottom: i < experience.length - 1 ? "1px solid #eee" : "none",
                            }}
                          >
                            {exp.description && (
                              <div style={{ color: "#555", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                                {exp.description}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <ContentHeading>Education</ContentHeading>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <tbody>
                      {education.map((edu, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              width: "38%",
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              paddingRight: "12px",
                              borderBottom: i < education.length - 1 ? "1px solid #eee" : "none",
                            }}
                          >
                            <div style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>
                              {edu.institution ?? edu.school}
                            </div>
                            <div style={{ color: "#888", fontSize: "10px", marginBottom: "2px" }}>
                              {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                            </div>
                            <div style={{ color: "#555", fontSize: "10px", fontStyle: "italic" }}>{edu.degree}</div>
                          </td>
                          <td
                            style={{
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              borderBottom: i < education.length - 1 ? "1px solid #eee" : "none",
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <ContentHeading>Projects</ContentHeading>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <tbody>
                      {projects.map((proj, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              width: "38%",
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              paddingRight: "12px",
                              borderBottom: i < projects.length - 1 ? "1px solid #eee" : "none",
                            }}
                          >
                            <div style={{ fontWeight: "700", color: "#111", marginBottom: "2px" }}>{proj.title}</div>
                            {proj.techStack && proj.techStack.length > 0 && (
                              <div style={{ color: "#888", fontSize: "10px", fontStyle: "italic", marginBottom: "3px" }}>
                                {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                              </div>
                            )}
                            {proj.githubLink && (
                              <div style={{ fontSize: "9px", marginBottom: "2px" }}>
                                <a href={proj.githubLink} target="_blank" rel="noreferrer"
                                  style={{ color: "#555", textDecoration: "underline" }}>
                                  GitHub →
                                </a>
                              </div>
                            )}
                            {proj.liveLink && (
                              <div style={{ fontSize: "9px" }}>
                                <a href={proj.liveLink} target="_blank" rel="noreferrer"
                                  style={{ color: "#555", textDecoration: "underline" }}>
                                  Live →
                                </a>
                              </div>
                            )}
                          </td>
                          <td
                            style={{
                              verticalAlign: "top",
                              paddingBottom: "12px",
                              borderBottom: i < projects.length - 1 ? "1px solid #eee" : "none",
                            }}
                          >
                            {proj.description && (
                              <div style={{ color: "#555", lineHeight: 1.6 }}>{proj.description}</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/* ── Helpers ── */

const SidebarHeading = ({ children }) => (
  <div style={{ marginBottom: "10px" }}>
    <div style={{ fontSize: "13px", fontWeight: "900", color: "#fff", fontFamily: "Georgia, serif" }}>
      {children}
    </div>
    <div style={{ width: "28px", height: "2px", background: "#777", marginTop: "4px" }} />
  </div>
);

const SidebarContact = ({ label, value }) => (
  <div style={{ marginBottom: "8px" }}>
    <div style={{ color: "#aaa", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}:
    </div>
    <div style={{ color: "#ddd", fontSize: "10px", marginTop: "1px", wordBreak: "break-all" }}>
      {value}
    </div>
  </div>
);

const SkillGroup = ({ label, items }) => (
  <div style={{ marginBottom: "10px" }}>
    <div style={{ color: "#aaa", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "5px" }}>
      {label}
    </div>
    <div>
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            background: "#444",
            color: "#eee",
            fontSize: "9px",
            padding: "2px 7px",
            borderRadius: "3px",
            marginRight: "4px",
            marginBottom: "4px",
          }}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

const ContentHeading = ({ children }) => (
  <div style={{ marginBottom: "4px" }}>
    <div style={{ fontSize: "16px", fontWeight: "900", color: "#111", fontFamily: "Georgia, serif", letterSpacing: "-0.3px" }}>
      {children}
    </div>
    <div style={{ width: "32px", height: "2.5px", background: "#2b2b2b", marginTop: "4px" }} />
  </div>
);

export default ModernTemplate;