

const formatDate = (d) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1] || ""} ${y}`;
};

// ── MODERN TEMPLATE ───────────────────────────────────────────────────────────
const modernHTML = (resume) => {
  const { personalInfo, summary, experience = [], education = [], skills, projects = [], links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  const skillChips = (items) => items.map((s) =>
    `<span style="display:inline-block;background:#444;color:#eee;font-size:9px;padding:2px 7px;border-radius:3px;margin-right:4px;margin-bottom:4px;">${s}</span>`
  ).join("");

  const skillGroup = (label, items) => items && items.length > 0 ? `
    <div style="margin-bottom:10px;">
      <div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">${label}</div>
      <div>${skillChips(items)}</div>
    </div>` : "";

  const expRows = experience.map((exp, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < experience.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${exp.role || ""}</div>
        <div style="color:#888;font-size:10px;margin-bottom:2px;">${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}</div>
        <div style="color:#555;font-size:10px;font-style:italic;">${exp.company || ""}</div>
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < experience.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="color:#555;line-height:1.6;white-space:pre-line;">${exp.description || ""}</div>
      </td>
    </tr>`).join("");

  const eduRows = education.map((edu, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < education.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${edu.institution || ""}</div>
        <div style="color:#888;font-size:10px;margin-bottom:2px;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</div>
        <div style="color:#555;font-size:10px;font-style:italic;">${edu.degree || ""}</div>
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < education.length - 1 ? "border-bottom:1px solid #eee;" : ""}"></td>
    </tr>`).join("");

  const projRows = projects.map((proj, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < projects.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${proj.title || ""}</div>
        <div style="color:#888;font-size:10px;font-style:italic;margin-bottom:3px;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack || ""}</div>
        ${proj.githubLink ? `<div style="font-size:9px;margin-bottom:2px;"><a href="${proj.githubLink}" style="color:#555;text-decoration:underline;">GitHub →</a></div>` : ""}
        ${proj.liveLink ? `<div style="font-size:9px;"><a href="${proj.liveLink}" style="color:#555;text-decoration:underline;">Live →</a></div>` : ""}
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < projects.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="color:#555;line-height:1.6;">${proj.description || ""}</div>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>* { margin:0; padding:0; box-sizing:border-box; } body { font-family: Georgia, serif; font-size:11px; color:#222; } table { border-collapse:collapse; }</style>
  </head><body>
  <table style="width:100%;min-height:100vh;"><tbody><tr>
    <td style="width:36%;background:#2b2b2b;color:#fff;padding:32px 20px;vertical-align:top;">
      <div style="border-bottom:2px solid #555;padding-bottom:16px;margin-bottom:20px;">
        <div style="font-size:24px;font-weight:900;line-height:1.15;letter-spacing:-0.5px;">
          ${(personalInfo.fullName || "Your Name").split(" ").map((w) => `<div>${w}</div>`).join("")}
        </div>
        ${personalInfo.portfolio ? `<div style="color:#aaa;font-size:10px;margin-top:6px;font-style:italic;">${personalInfo.portfolio}</div>` : ""}
        <div style="margin-top:10px;">
          ${links.linkedin ? `<div style="font-size:10px;color:#bbb;margin-bottom:3px;">in ${links.linkedin}</div>` : ""}
          ${links.github ? `<div style="font-size:10px;color:#bbb;margin-bottom:3px;">gh ${links.github}</div>` : ""}
          ${links.leetcode ? `<div style="font-size:10px;color:#bbb;margin-bottom:3px;">lc ${links.leetcode}</div>` : ""}
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="font-size:13px;font-weight:900;margin-bottom:4px;">Contact</div>
        <div style="width:28px;height:2px;background:#777;margin-bottom:10px;"></div>
        ${personalInfo.email ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Email:</div><div style="color:#ddd;font-size:10px;word-break:break-all;">${personalInfo.email}</div></div>` : ""}
        ${personalInfo.phone ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Phone:</div><div style="color:#ddd;font-size:10px;">${personalInfo.phone}</div></div>` : ""}
        ${personalInfo.address ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Address:</div><div style="color:#ddd;font-size:10px;">${personalInfo.address}</div></div>` : ""}
      </div>
      ${hasSkills ? `
      <div>
        <div style="font-size:13px;font-weight:900;margin-bottom:4px;">Skills</div>
        <div style="width:28px;height:2px;background:#777;margin-bottom:10px;"></div>
        ${skillGroup("Technical", skills.technical)}
        ${skillGroup("Tools", skills.tools)}
        ${skillGroup("Core", skills.coreSubjects)}
        ${skillGroup("Soft Skills", skills.communication)}
      </div>` : ""}
    </td>
    <td style="padding:32px 26px;vertical-align:top;background:#fff;">
      ${summary ? `<div style="margin-bottom:20px;"><div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Profile</div><div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:8px;"></div><div style="color:#444;line-height:1.7;">${summary}</div></div>` : ""}
      ${experience.length > 0 ? `<div style="margin-bottom:20px;"><div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Experience</div><div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div><table style="width:100%;border-collapse:collapse;"><tbody>${expRows}</tbody></table></div>` : ""}
      ${education.length > 0 ? `<div style="margin-bottom:20px;"><div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Education</div><div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div><table style="width:100%;border-collapse:collapse;"><tbody>${eduRows}</tbody></table></div>` : ""}
      ${projects.length > 0 ? `<div style="margin-bottom:20px;"><div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Projects</div><div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div><table style="width:100%;border-collapse:collapse;"><tbody>${projRows}</tbody></table></div>` : ""}
    </td>
  </tr></tbody></table>
  </body></html>`;
};

// ── MINIMAL TEMPLATE ──────────────────────────────────────────────────────────
const minimalHTML = (resume) => {
  const { personalInfo, summary, experience = [], education = [], skills, projects = [], links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);
  const allSkills = [
    ...(skills.technical || []),
    ...(skills.coreSubjects || []),
    ...(skills.tools || []),
    ...(skills.communication || []),
  ];

  const sh = (text) =>
    `<div style="font-weight:700;text-transform:uppercase;color:#1f2937;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #d1d5db;font-size:9px;letter-spacing:0.22em;">${text}</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>* { margin:0; padding:0; box-sizing:border-box; } body { font-family:Georgia,serif; font-size:11px; line-height:1.55; background:#f3f4f6; color:#111827; } table { border-collapse:collapse; }</style>
  </head><body>
    <div style="padding:40px 40px 28px;">
      <div style="font-weight:900;text-transform:uppercase;color:#111827;line-height:1;font-size:30px;letter-spacing:0.1em;">
        ${(personalInfo.fullName || "Your Name").split(" ").map((w) => `<div>${w}</div>`).join("")}
      </div>
      ${personalInfo.portfolio ? `<p style="margin-top:12px;color:#6b7280;text-transform:uppercase;font-size:9.5px;letter-spacing:0.22em;">${personalInfo.portfolio}</p>` : ""}
    </div>
    <table style="width:100%;"><tbody><tr>
      <td style="width:35%;vertical-align:top;padding:0 0 40px 40px;">
        <div style="margin-bottom:24px;">
          ${sh("Contact")}
          <div style="color:#4b5563;font-size:11px;">
            ${personalInfo.phone ? `<div style="margin-bottom:4px;">${personalInfo.phone}</div>` : ""}
            ${personalInfo.email ? `<div style="margin-bottom:4px;">${personalInfo.email}</div>` : ""}
            ${links.linkedin ? `<div style="margin-bottom:4px;">${links.linkedin}</div>` : ""}
            ${links.github ? `<div style="margin-bottom:4px;">${links.github}</div>` : ""}
            ${links.leetcode ? `<div style="margin-bottom:4px;">${links.leetcode}</div>` : ""}
            ${personalInfo.address ? `<div style="margin-bottom:4px;">${personalInfo.address}</div>` : ""}
          </div>
        </div>
        ${education.length > 0 ? `
        <div style="margin-bottom:24px;">
          ${sh("Education")}
          ${education.map((edu) => `
          <div style="margin-bottom:16px;">
            <div style="font-weight:700;text-transform:uppercase;color:#111827;font-size:9.5px;letter-spacing:0.06em;line-height:1.3;">${edu.institution || ""}</div>
            ${edu.degree ? `<div style="color:#4b5563;margin-top:2px;">${edu.degree}</div>` : ""}
            <div style="color:#9ca3af;margin-top:2px;font-size:10px;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</div>
          </div>`).join("")}
        </div>` : ""}
        ${hasSkills ? `
        <div>
          ${sh("Skills")}
          ${allSkills.map((s) => `<div style="color:#374151;margin-bottom:2px;">${s}</div>`).join("")}
        </div>` : ""}
      </td>
      <td style="width:1px;background:#d1d5db;padding:0;"></td>
      <td style="vertical-align:top;padding:0 40px 40px 20px;">
        ${summary ? `<div style="margin-bottom:24px;">${sh("About")}<p style="color:#374151;line-height:1.6;">${summary}</p></div>` : ""}
        ${experience.length > 0 ? `
        <div style="margin-bottom:24px;">
          ${sh("Experience")}
          ${experience.map((exp) => `
          <div style="margin-bottom:20px;">
            <div style="font-weight:700;text-transform:uppercase;color:#111827;font-size:9.5px;letter-spacing:0.06em;">${exp.role || ""}</div>
            <div style="color:#6b7280;font-size:10px;margin:2px 0 4px;">${exp.company || ""}${(exp.startDate || exp.endDate) ? ` | ${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}` : ""}</div>
            ${exp.description ? `<div style="color:#374151;white-space:pre-line;line-height:1.6;">${exp.description}</div>` : ""}
          </div>`).join("")}
        </div>` : ""}
        ${projects.length > 0 ? `
        <div>
          ${sh("Projects")}
          ${projects.map((proj) => `
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:baseline;justify-content:space-between;">
              <div style="font-weight:700;text-transform:uppercase;color:#111827;font-size:9.5px;letter-spacing:0.06em;">${proj.title || ""}</div>
              <div>
                ${proj.githubLink ? `<a href="${proj.githubLink}" style="color:#9ca3af;text-decoration:underline;font-size:9px;margin-right:8px;">GitHub</a>` : ""}
                ${proj.liveLink ? `<a href="${proj.liveLink}" style="color:#9ca3af;text-decoration:underline;font-size:9px;">Live</a>` : ""}
              </div>
            </div>
            ${proj.techStack && proj.techStack.length ? `<div style="color:#6b7280;font-size:10px;margin:2px 0 4px;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}</div>` : ""}
            ${proj.description ? `<div style="color:#374151;line-height:1.6;">${proj.description}</div>` : ""}
          </div>`).join("")}
        </div>` : ""}
      </td>
    </tr></tbody></table>
  </body></html>`;
};

// ── PROFESSIONAL TEMPLATE ─────────────────────────────────────────────────────
const professionalHTML = (resume) => {
  const { personalInfo, summary, experience = [], education = [], skills, projects = [], links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  const sh = (text) =>
    `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;background:#f3f4f6;padding:4px 12px;color:#374151;margin-bottom:12px;">${text}</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>* { margin:0; padding:0; box-sizing:border-box; } body { font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; color:#1f2937; background:#fff; } table { border-collapse:collapse; }</style>
  </head><body>
    <div style="text-align:center;padding:24px 32px 0;margin-bottom:24px;">
      <h1 style="font-size:28px;font-weight:700;color:#111827;margin:0 0 8px;">${personalInfo.fullName || "Your Name"}</h1>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;font-size:11px;color:#6b7280;">
        ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ""}
        ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ""}
        ${personalInfo.address ? `<span>${personalInfo.address}</span>` : ""}
        ${links.github ? `<span>${links.github}</span>` : ""}
        ${links.linkedin ? `<span>${links.linkedin}</span>` : ""}
        ${links.leetcode ? `<span>${links.leetcode}</span>` : ""}
      </div>
    </div>
    <div style="padding:0 32px 32px;">
      ${summary ? `<section style="margin-bottom:20px;">${sh("Objective")}<p style="color:#374151;padding:0 12px;">${summary}</p></section>` : ""}
      ${experience.length > 0 ? `
      <section style="margin-bottom:20px;">
        ${sh("Work Experience")}
        ${experience.map((exp) => `
        <div style="margin-bottom:16px;padding:0 12px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <div style="font-weight:700;">${exp.role || ""}</div>
            <div style="font-size:11px;color:#6b7280;">${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}</div>
          </div>
          <div style="color:#6b7280;font-style:italic;font-size:11px;margin:2px 0;">${exp.company || ""}</div>
          ${exp.description ? `<div style="margin-top:4px;color:#374151;white-space:pre-line;line-height:1.6;">${exp.description}</div>` : ""}
        </div>`).join("")}
      </section>` : ""}
      ${education.length > 0 ? `
      <section style="margin-bottom:20px;">
        ${sh("Education")}
        ${education.map((edu) => `
        <div style="margin-bottom:12px;padding:0 12px;display:flex;justify-content:space-between;align-items:baseline;">
          <div>
            <div style="font-weight:700;">${edu.degree || ""}</div>
            <div style="color:#6b7280;font-size:11px;margin-top:2px;">${edu.institution || ""}</div>
          </div>
          <div style="font-size:11px;color:#6b7280;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</div>
        </div>`).join("")}
      </section>` : ""}
      ${hasSkills ? `
      <section style="margin-bottom:20px;">
        ${sh("Skills")}
        <div style="padding:0 12px;line-height:1.8;">
          ${skills.technical && skills.technical.length ? `<div><strong>Technical: </strong>${skills.technical.join(", ")}</div>` : ""}
          ${skills.coreSubjects && skills.coreSubjects.length ? `<div><strong>Core Subjects: </strong>${skills.coreSubjects.join(", ")}</div>` : ""}
          ${skills.tools && skills.tools.length ? `<div><strong>Tools: </strong>${skills.tools.join(", ")}</div>` : ""}
          ${skills.communication && skills.communication.length ? `<div><strong>Soft Skills: </strong>${skills.communication.join(", ")}</div>` : ""}
        </div>
      </section>` : ""}
      ${projects.length > 0 ? `
      <section>
        ${sh("Projects")}
        ${projects.map((proj) => `
        <div style="margin-bottom:16px;padding:0 12px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <div style="font-weight:700;">${proj.title || ""}</div>
            <div style="display:flex;gap:8px;">
              ${proj.githubLink ? `<a href="${proj.githubLink}" style="color:#3b82f6;font-size:11px;text-decoration:underline;">GitHub →</a>` : ""}
              ${proj.liveLink ? `<a href="${proj.liveLink}" style="color:#3b82f6;font-size:11px;text-decoration:underline;">Live →</a>` : ""}
            </div>
          </div>
          ${proj.techStack && proj.techStack.length ? `<div style="font-size:11px;color:#6b7280;font-style:italic;margin:2px 0;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}</div>` : ""}
          ${proj.description ? `<div style="color:#374151;margin-top:4px;line-height:1.6;">${proj.description}</div>` : ""}
        </div>`).join("")}
      </section>` : ""}
    </div>
  </body></html>`;
};

const renderTemplate = (resume) => {
  switch (resume.template) {
    case "modern":       return modernHTML(resume);
    case "minimal":      return minimalHTML(resume);
    case "professional": return professionalHTML(resume);
    default:             return modernHTML(resume);
  }
};

export default renderTemplate;