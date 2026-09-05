

// components/resume-builder/templates/MinimalTemplate.jsx
const formatDate = (d) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
};

const SectionHeading = ({ children }) => (
  <h2 style={{
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#1f2937",
    marginBottom: "8px",
    paddingBottom: "4px",
    borderBottom: "1px solid #d1d5db",
    fontSize: "9px",
    letterSpacing: "0.22em",
  }}>
    {children}
  </h2>
);

const MinimalTemplate = ({ personalInfo, summary, experience, education, skills, projects, links }) => {
  const hasSkills = Object.values(skills).some((arr) => arr.length > 0);
  const allSkills = [
    ...skills.technical,
    ...skills.coreSubjects,
    ...skills.tools,
    ...skills.communication,
  ];

  return (
    <div style={{
      background: "#f3f4f6",
      color: "#111827",
      fontFamily: "Georgia, serif",
      fontSize: "11px",
      lineHeight: "1.55",
      minHeight: "100%",
    }}>

      {/* ── Top name block ── */}
      <div style={{ padding: "40px 40px 28px" }}>
        <h1 style={{
          fontWeight: "900",
          textTransform: "uppercase",
          color: "#111827",
          lineHeight: 1,
          fontSize: "30px",
          letterSpacing: "0.1em",
          margin: 0,
        }}>
          {personalInfo.fullName
            ? personalInfo.fullName.split(" ").map((word, i) => (
                <span key={i} style={{ display: "block" }}>{word}</span>
              ))
            : <><span style={{ display: "block" }}>YOUR</span><span style={{ display: "block" }}>NAME</span></>
          }
        </h1>
        {personalInfo.portfolio && (
          <p style={{ marginTop: "12px", color: "#6b7280", textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.22em" }}>
            {personalInfo.portfolio}
          </p>
        )}
      </div>

      {/* ── Two column body ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", padding: "0 40px 40px" }}>
        <tbody>
          <tr>

            {/* LEFT SIDEBAR */}
            <td style={{ width: "35%", verticalAlign: "top", padding: "0 0 40px 40px" }}>

              {/* Contact */}
              <section style={{ marginBottom: "24px" }}>
                <SectionHeading>Contact</SectionHeading>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", color: "#4b5563", fontSize: "11px" }}>
                  {personalInfo.phone   && <span>{personalInfo.phone}</span>}
                  {personalInfo.email   && <span>{personalInfo.email}</span>}
                  {links.linkedin       && <span>{links.linkedin}</span>}
                  {links.github         && <span>{links.github}</span>}
                  {links.leetcode       && <span>{links.leetcode}</span>}
                  {personalInfo.address && <span style={{ lineHeight: "1.4" }}>{personalInfo.address}</span>}
                </div>
              </section>

              {/* Education */}
              {education.length > 0 && (
                <section style={{ marginBottom: "24px" }}>
                  <SectionHeading>Education</SectionHeading>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {education.map((edu, i) => (
                      <div key={i}>
                        <p style={{ fontWeight: "700", textTransform: "uppercase", color: "#111827", fontSize: "9.5px", letterSpacing: "0.06em", lineHeight: "1.3", margin: 0 }}>
                          {edu.institution}
                        </p>
                        {edu.degree && (
                          <p style={{ color: "#4b5563", marginTop: "2px", margin: "2px 0 0" }}>{edu.degree}</p>
                        )}
                        <p style={{ color: "#9ca3af", marginTop: "2px", fontSize: "10px", margin: "2px 0 0" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", color: "#374151" }}>
                    {allSkills.map((s, i) => (
                      <p key={i} style={{ margin: 0 }}>{s}</p>
                    ))}
                  </div>
                </section>
              )}
            </td>

            {/* VERTICAL DIVIDER */}
            <td style={{ width: "1px", background: "#d1d5db", padding: 0 }} />

            {/* RIGHT MAIN */}
            <td style={{ verticalAlign: "top", padding: "0 40px 40px 20px" }}>

              {/* Summary */}
              {summary && (
                <section style={{ marginBottom: "24px" }}>
                  <SectionHeading>About</SectionHeading>
                  <p style={{ color: "#374151", lineHeight: "1.6", margin: 0 }}>{summary}</p>
                </section>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <section style={{ marginBottom: "24px" }}>
                  <SectionHeading>Experience</SectionHeading>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {experience.map((exp, i) => (
                      <div key={i}>
                        <p style={{ fontWeight: "700", textTransform: "uppercase", color: "#111827", fontSize: "9.5px", letterSpacing: "0.06em", margin: 0 }}>
                          {exp.role}
                        </p>
                        <p style={{ color: "#6b7280", fontSize: "10px", marginBottom: "4px", margin: "2px 0 4px" }}>
                          {exp.company}
                          {(exp.startDate || exp.endDate) && <> | {formatDate(exp.startDate)} – {formatDate(exp.endDate)}</>}
                        </p>
                        {exp.description && (
                          <p style={{ color: "#374151", whiteSpace: "pre-line", lineHeight: "1.6", margin: 0 }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {projects.map((proj, i) => (
                      <div key={i}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <p style={{ fontWeight: "700", textTransform: "uppercase", color: "#111827", fontSize: "9.5px", letterSpacing: "0.06em", margin: 0 }}>
                            {proj.title}
                          </p>
                          <div style={{ display: "flex", gap: "12px" }}>
                            {proj.githubLink && (
                              <a href={proj.githubLink} target="_blank" rel="noreferrer"
                                style={{ color: "#9ca3af", textDecoration: "underline", fontSize: "9px" }}>
                                GitHub
                              </a>
                            )}
                            {proj.liveLink && (
                              <a href={proj.liveLink} target="_blank" rel="noreferrer"
                                style={{ color: "#9ca3af", textDecoration: "underline", fontSize: "9px" }}>
                                Live
                              </a>
                            )}
                          </div>
                        </div>
                        {proj.techStack?.length > 0 && (
                          <p style={{ color: "#6b7280", fontSize: "10px", margin: "2px 0 4px" }}>
                            {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                          </p>
                        )}
                        {proj.description && (
                          <p style={{ color: "#374151", lineHeight: "1.6", margin: 0 }}>{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MinimalTemplate;