// Converts resume data into a full HTML page string for each template
// Puppeteer renders this HTML to PDF

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (dateStr === "Present") return "Present";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// ── MODERN TEMPLATE (dark sidebar + white content) ────────────────────────────
const modernHTML = (resume) => {
  const { personalInfo, summary, experience, education, skills, projects, links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  const skillChips = (items) =>
    items.map((s) => `<span style="display:inline-block;background:#444;color:#eee;font-size:9px;padding:2px 7px;border-radius:3px;margin-right:4px;margin-bottom:4px;">${s}</span>`).join("");

  const skillGroup = (label, items) =>
    items && items.length > 0
      ? `<div style="margin-bottom:10px;">
          <div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">${label}</div>
          <div>${skillChips(items)}</div>
        </div>`
      : "";

  const expRows = (experience || []).map((exp, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < experience.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${exp.role || ""}</div>
        <div style="color:#888;font-size:10px;margin-bottom:2px;">${formatDate(exp.startDate)} – ${formatDate(exp.endDate) || "Present"}</div>
        <div style="color:#555;font-size:10px;font-style:italic;">${exp.company || ""}</div>
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < experience.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="color:#555;line-height:1.6;white-space:pre-line;">${exp.description || ""}</div>
      </td>
    </tr>`).join("");

  const eduRows = (education || []).map((edu, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < education.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${edu.institution || ""}</div>
        <div style="color:#888;font-size:10px;margin-bottom:2px;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate) || "Present"}</div>
        <div style="color:#555;font-size:10px;font-style:italic;">${edu.degree || ""}</div>
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < education.length - 1 ? "border-bottom:1px solid #eee;" : ""}"></td>
    </tr>`).join("");

  const projRows = (projects || []).map((proj, i) => `
    <tr>
      <td style="width:38%;vertical-align:top;padding-bottom:12px;padding-right:12px;${i < projects.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="font-weight:700;color:#111;margin-bottom:2px;">${proj.title || ""}</div>
        <div style="color:#888;font-size:10px;font-style:italic;margin-bottom:3px;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack || ""}</div>
        ${proj.githubLink ? `<div style="font-size:9px;"><a href="${proj.githubLink}" style="color:#555;text-decoration:underline;">GitHub →</a></div>` : ""}
        ${proj.liveLink ? `<div style="font-size:9px;"><a href="${proj.liveLink}" style="color:#555;text-decoration:underline;">Live →</a></div>` : ""}
      </td>
      <td style="vertical-align:top;padding-bottom:12px;${i < projects.length - 1 ? "border-bottom:1px solid #eee;" : ""}">
        <div style="color:#555;line-height:1.6;">${proj.description || ""}</div>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Georgia, serif; font-size:11px; color:#222; }
    table { border-collapse:collapse; }
  </style>
  </head><body>
  <table style="width:100%;min-height:100vh;">
    <tr>
      <td style="width:36%;background:#2b2b2b;color:#fff;padding:32px 20px;vertical-align:top;">
        <!-- Name -->
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

        <!-- Contact -->
        <div style="margin-bottom:20px;">
          <div style="font-size:13px;font-weight:900;margin-bottom:4px;">Contact</div>
          <div style="width:28px;height:2px;background:#777;margin-bottom:10px;"></div>
          ${personalInfo.email ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Email:</div><div style="color:#ddd;font-size:10px;word-break:break-all;">${personalInfo.email}</div></div>` : ""}
          ${personalInfo.phone ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Phone:</div><div style="color:#ddd;font-size:10px;">${personalInfo.phone}</div></div>` : ""}
          ${personalInfo.address ? `<div style="margin-bottom:8px;"><div style="color:#aaa;font-size:9px;text-transform:uppercase;letter-spacing:0.08em;">Address:</div><div style="color:#ddd;font-size:10px;">${personalInfo.address}</div></div>` : ""}
        </div>

        <!-- Skills -->
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
        ${summary ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Profile</div>
          <div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:8px;"></div>
          <div style="color:#444;line-height:1.7;">${summary}</div>
        </div>` : ""}

        ${experience && experience.length > 0 ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Experience</div>
          <div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div>
          <table style="width:100%;border-collapse:collapse;"><tbody>${expRows}</tbody></table>
        </div>` : ""}

        ${education && education.length > 0 ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Education</div>
          <div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div>
          <table style="width:100%;border-collapse:collapse;"><tbody>${eduRows}</tbody></table>
        </div>` : ""}

        ${projects && projects.length > 0 ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:16px;font-weight:900;letter-spacing:-0.3px;">Projects</div>
          <div style="width:32px;height:2.5px;background:#2b2b2b;margin-top:4px;margin-bottom:10px;"></div>
          <table style="width:100%;border-collapse:collapse;"><tbody>${projRows}</tbody></table>
        </div>` : ""}
      </td>
    </tr>
  </table>
  </body></html>`;
};

// ── MINIMAL TEMPLATE (clean single column) ────────────────────────────────────
const minimalHTML = (resume) => {
  const { personalInfo, summary, experience, education, skills, projects, links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; color:#222; padding:40px 50px; }
    h2 { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#555; border-bottom:1px solid #ddd; padding-bottom:4px; margin-bottom:10px; margin-top:20px; }
  </style>
  </head><body>
    <!-- Header -->
    <div style="text-align:center;margin-bottom:20px;border-bottom:2px solid #222;padding-bottom:16px;">
      <div style="font-size:26px;font-weight:700;letter-spacing:-0.5px;">${personalInfo.fullName || "Your Name"}</div>
      <div style="color:#555;font-size:10px;margin-top:6px;">
        ${[personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean).join(" · ")}
      </div>
      <div style="color:#777;font-size:10px;margin-top:3px;">
        ${[links.github ? `GitHub: ${links.github}` : null, links.linkedin ? `LinkedIn: ${links.linkedin}` : null, links.leetcode ? `LeetCode: ${links.leetcode}` : null].filter(Boolean).join(" · ")}
      </div>
    </div>

    ${summary ? `<h2>Profile</h2><div style="color:#444;line-height:1.7;">${summary}</div>` : ""}

    ${experience && experience.length > 0 ? `
    <h2>Experience</h2>
    ${experience.map((exp) => `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <div style="font-weight:700;font-size:11px;">${exp.role}</div>
          <div style="color:#888;font-size:10px;">${formatDate(exp.startDate)} – ${formatDate(exp.endDate) || "Present"}</div>
        </div>
        <div style="color:#3b82f6;font-size:10px;">${exp.company}</div>
        ${exp.description ? `<div style="color:#444;margin-top:3px;line-height:1.6;">${exp.description}</div>` : ""}
      </div>`).join("")}` : ""}

    ${education && education.length > 0 ? `
    <h2>Education</h2>
    ${education.map((edu) => `
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <div style="font-weight:700;">${edu.degree}</div>
          <div style="color:#888;font-size:10px;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate) || "Present"}</div>
        </div>
        <div style="color:#555;font-size:10px;">${edu.institution}</div>
      </div>`).join("")}` : ""}

    ${hasSkills ? `
    <h2>Skills</h2>
    <div style="line-height:1.8;">
      ${skills.technical && skills.technical.length ? `<div><strong>Technical:</strong> ${skills.technical.join(", ")}</div>` : ""}
      ${skills.tools && skills.tools.length ? `<div><strong>Tools:</strong> ${skills.tools.join(", ")}</div>` : ""}
      ${skills.coreSubjects && skills.coreSubjects.length ? `<div><strong>Core:</strong> ${skills.coreSubjects.join(", ")}</div>` : ""}
      ${skills.communication && skills.communication.length ? `<div><strong>Soft Skills:</strong> ${skills.communication.join(", ")}</div>` : ""}
    </div>` : ""}

    ${projects && projects.length > 0 ? `
    <h2>Projects</h2>
    ${projects.map((proj) => `
      <div style="margin-bottom:12px;">
        <div style="font-weight:700;">${proj.title}</div>
        ${proj.techStack && proj.techStack.length ? `<div style="color:#7c3aed;font-size:10px;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}</div>` : ""}
        ${proj.description ? `<div style="color:#444;margin-top:3px;line-height:1.6;">${proj.description}</div>` : ""}
        <div style="margin-top:3px;">
          ${proj.githubLink ? `<a href="${proj.githubLink}" style="color:#1e40af;font-size:9px;text-decoration:underline;margin-right:8px;">GitHub →</a>` : ""}
          ${proj.liveLink ? `<a href="${proj.liveLink}" style="color:#1e40af;font-size:9px;text-decoration:underline;">Live →</a>` : ""}
        </div>
      </div>`).join("")}` : ""}
  </body></html>`;
};

// ── PROFESSIONAL TEMPLATE (two column elegant) ────────────────────────────────
const professionalHTML = (resume) => {
  const { personalInfo, summary, experience, education, skills, projects, links } = resume;
  const hasSkills = Object.values(skills).some((arr) => arr && arr.length > 0);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:11px; color:#1f2937; }
  </style>
  </head><body>
  <!-- Header -->
  <div style="background:#1f2937;color:#fff;padding:28px 40px;">
    <div style="font-size:26px;font-weight:700;letter-spacing:-0.5px;">${personalInfo.fullName || "Your Name"}</div>
    <div style="color:#9ca3af;font-size:10px;margin-top:6px;">
      ${[personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.portfolio].filter(Boolean).join("  ·  ")}
    </div>
    <div style="color:#6b7280;font-size:10px;margin-top:3px;">
      ${[links.github ? `GitHub: ${links.github}` : null, links.linkedin ? `LinkedIn: ${links.linkedin}` : null, links.leetcode ? `LeetCode: ${links.leetcode}` : null].filter(Boolean).join("  ·  ")}
    </div>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <!-- Left column -->
      <td style="width:35%;padding:24px 20px;vertical-align:top;background:#f9fafb;border-right:1px solid #e5e7eb;">
        ${hasSkills ? `
        <div style="margin-bottom:20px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#374151;border-bottom:2px solid #1f2937;padding-bottom:4px;margin-bottom:10px;">Skills</div>
          ${skills.technical && skills.technical.length ? `<div style="margin-bottom:8px;"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:4px;">Technical</div>${skills.technical.map((s) => `<div style="font-size:10px;color:#374151;padding:2px 0;">${s}</div>`).join("")}</div>` : ""}
          ${skills.tools && skills.tools.length ? `<div style="margin-bottom:8px;"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:4px;">Tools</div>${skills.tools.map((s) => `<div style="font-size:10px;color:#374151;padding:2px 0;">${s}</div>`).join("")}</div>` : ""}
          ${skills.coreSubjects && skills.coreSubjects.length ? `<div style="margin-bottom:8px;"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:4px;">Core Subjects</div>${skills.coreSubjects.map((s) => `<div style="font-size:10px;color:#374151;padding:2px 0;">${s}</div>`).join("")}</div>` : ""}
          ${skills.communication && skills.communication.length ? `<div style="margin-bottom:8px;"><div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:4px;">Soft Skills</div>${skills.communication.map((s) => `<div style="font-size:10px;color:#374151;padding:2px 0;">${s}</div>`).join("")}</div>` : ""}
        </div>` : ""}

        ${education && education.length > 0 ? `
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#374151;border-bottom:2px solid #1f2937;padding-bottom:4px;margin-bottom:10px;">Education</div>
          ${education.map((edu) => `
          <div style="margin-bottom:10px;">
            <div style="font-weight:700;font-size:11px;">${edu.degree}</div>
            <div style="color:#4b5563;font-size:10px;">${edu.institution}</div>
            <div style="color:#9ca3af;font-size:10px;">${formatDate(edu.startDate)} – ${formatDate(edu.endDate) || "Present"}</div>
          </div>`).join("")}
        </div>` : ""}
      </td>

      <!-- Right column -->
      <td style="padding:24px 28px;vertical-align:top;">
        ${summary ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#374151;border-bottom:2px solid #1f2937;padding-bottom:4px;margin-bottom:8px;">Summary</div>
          <div style="color:#4b5563;line-height:1.7;">${summary}</div>
        </div>` : ""}

        ${experience && experience.length > 0 ? `
        <div style="margin-bottom:18px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#374151;border-bottom:2px solid #1f2937;padding-bottom:4px;margin-bottom:10px;">Experience</div>
          ${experience.map((exp) => `
          <div style="margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;">
              <div style="font-weight:700;">${exp.role}</div>
              <div style="color:#9ca3af;font-size:10px;">${formatDate(exp.startDate)} – ${formatDate(exp.endDate) || "Present"}</div>
            </div>
            <div style="color:#059669;font-size:10px;font-weight:600;">${exp.company}</div>
            ${exp.description ? `<div style="color:#4b5563;margin-top:3px;line-height:1.6;">${exp.description}</div>` : ""}
          </div>`).join("")}
        </div>` : ""}

        ${projects && projects.length > 0 ? `
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#374151;border-bottom:2px solid #1f2937;padding-bottom:4px;margin-bottom:10px;">Projects</div>
          ${projects.map((proj) => `
          <div style="margin-bottom:12px;">
            <div style="font-weight:700;">${proj.title}</div>
            ${proj.techStack && proj.techStack.length ? `<div style="color:#7c3aed;font-size:10px;">${Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}</div>` : ""}
            ${proj.description ? `<div style="color:#4b5563;margin-top:3px;line-height:1.6;">${proj.description}</div>` : ""}
            <div>
              ${proj.githubLink ? `<a href="${proj.githubLink}" style="color:#1e40af;font-size:9px;text-decoration:underline;margin-right:8px;">GitHub →</a>` : ""}
              ${proj.liveLink ? `<a href="${proj.liveLink}" style="color:#1e40af;font-size:9px;text-decoration:underline;">Live →</a>` : ""}
            </div>
          </div>`).join("")}
        </div>` : ""}
      </td>
    </tr>
  </table>
  </body></html>`;
};

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
const renderTemplate = (resume) => {
  switch (resume.template) {
    case "modern":       return modernHTML(resume);
    case "minimal":      return minimalHTML(resume);
    case "professional": return professionalHTML(resume);
    default:             return modernHTML(resume);
  }
};

export default renderTemplate;