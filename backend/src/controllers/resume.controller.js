import { createResumeService, getSingleResumeService, getUserResumeService, updateResumeService, deleteResumeService } from "../services/resume.service.js";

import PDFDocument from "pdfkit";
import Resume from "../models/resume.model.js";

// ── Create ────────────────────────────────────────────────────────────────────
const createResume = async (req, res) => {
  try {
    const resume = await createResumeService(req.body, req.user._id);
    res.status(201).json({ message: "resume created successfully", resume });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── Get all ───────────────────────────────────────────────────────────────────
const getUserResume = async (req, res) => {
  try {
    const resumes = await getUserResumeService(req.user._id);
    res.status(200).json({ message: "fetched all resumes", resumes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── Get single ────────────────────────────────────────────────────────────────
const getSingleResume = async (req, res) => {
  try {
    const resume = await getSingleResumeService(req.params.id, req.user._id);
    if (!resume) return res.status(404).json({ message: "resume not found" });
    res.status(200).json({ message: "single resume fetched", resume });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── Update ────────────────────────────────────────────────────────────────────
const updateResume = async (req, res) => {
  try {
    const updated = await updateResumeService(req.params.id, req.body, req.user._id);
    if (!updated) return res.status(404).json({ message: "resume not found" });
    res.status(200).json({ message: "resume updated successfully", updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── Delete ────────────────────────────────────────────────────────────────────
const deleteResume = async (req, res) => {
  try {
    const deleted = await deleteResumeService(req.params.id, req.user._id);
    if (!deleted) return res.status(404).json({ message: "resume not found" });
    res.status(200).json({ message: "resume deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ── Download PDF ──────────────────────────────────────────────────────────────
const downloadResumePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // A4 page with generous margins for breathing room
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 60, right: 60 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${resume.title}.pdf"`);
    doc.pipe(res);

    const pageWidth  = doc.page.width  - doc.page.margins.left - doc.page.margins.right;
    const leftMargin = doc.page.margins.left;

    // ── Helper: draw section heading bar ─────────────────────────────────────
    const sectionHeading = (text) => {
      doc.moveDown(1.2); // space ABOVE heading

      const y = doc.y;
      // Blue filled rectangle behind the text
      doc
        .rect(leftMargin, y, pageWidth, 20)
        .fill("#1e40af");

      // White bold text inside the bar
      doc
        .fillColor("#ffffff")
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(text.toUpperCase(), leftMargin + 6, y + 5, { width: pageWidth });

      // Reset color and add space BELOW heading
      doc.fillColor("#111111").moveDown(0.8);
    };

    // ── Helper: divider line ──────────────────────────────────────────────────
    const divider = () => {
      doc.moveDown(0.3);
      doc
        .moveTo(leftMargin, doc.y)
        .lineTo(leftMargin + pageWidth, doc.y)
        .lineWidth(0.5)
        .strokeColor("#cbd5e1")
        .stroke();
      doc.moveDown(0.4);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // HEADER — Name
    // ─────────────────────────────────────────────────────────────────────────
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .fillColor("#1e40af")
      .text(resume.personalInfo.fullName, { align: "center" });

    doc.moveDown(0.4);

    // Contact row — email | phone | address | portfolio
    const contactParts = [
      resume.personalInfo.email,
      resume.personalInfo.phone,
      resume.personalInfo.address,
      resume.personalInfo.portfolio,
    ].filter(Boolean);

    doc
      .fontSize(9.5)
      .font("Helvetica")
      .fillColor("#374151")
      .text(contactParts.join("   |   "), { align: "center" });

    doc.moveDown(0.3);

    // Links row — GitHub | LinkedIn | LeetCode
    const links = resume.links || {};
    const linkParts = [
      links.github   ? `GitHub: ${links.github}`     : null,
      links.linkedin ? `LinkedIn: ${links.linkedin}`  : null,
      links.leetcode ? `LeetCode: ${links.leetcode}`  : null,
    ].filter(Boolean);

    if (linkParts.length > 0) {
      doc
        .fontSize(9.5)
        .font("Helvetica")
        .fillColor("#1e40af")
        .text(linkParts.join("   |   "), { align: "center" });
    }

    doc.fillColor("#111111").moveDown(0.4);

    // Thick blue underline below header
    doc
      .moveTo(leftMargin, doc.y)
      .lineTo(leftMargin + pageWidth, doc.y)
      .lineWidth(2)
      .strokeColor("#1e40af")
      .stroke();

    // ─────────────────────────────────────────────────────────────────────────
    // SUMMARY
    // ─────────────────────────────────────────────────────────────────────────
    if (resume.summary) {
      sectionHeading("Summary");
      doc
        .fontSize(10.5)
        .font("Helvetica")
        .fillColor("#1f2937")
        .text(resume.summary, { align: "justify", lineGap: 3 });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXPERIENCE
    // ─────────────────────────────────────────────────────────────────────────
    if (resume.experience && resume.experience.length > 0) {
      sectionHeading("Experience");

      resume.experience.forEach((exp, i) => {
        if (i > 0) divider();

        const dateStr = [exp.startDate, exp.endDate || "Present"]
          .filter(Boolean).join(" – ");

        // Role (bold) on left, date on right — same line
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor("#111827")
          .text(exp.role, leftMargin, doc.y, { continued: true, width: pageWidth * 0.65 });

        doc
          .fontSize(9.5)
          .font("Helvetica")
          .fillColor("#6b7280")
          .text(dateStr, { align: "right" });

        // Company on its own line
        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor("#3b82f6")
          .text(exp.company);

        // Description
        if (exp.description) {
          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#374151")
            .text(exp.description, { indent: 10, lineGap: 2 });
        }

        doc.moveDown(0.5);
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EDUCATION
    // ─────────────────────────────────────────────────────────────────────────
    if (resume.education && resume.education.length > 0) {
      sectionHeading("Education");

      resume.education.forEach((edu, i) => {
        if (i > 0) divider();

        const dateStr = [edu.startDate, edu.endDate || "Present"]
          .filter(Boolean).join(" – ");

        // Degree (bold) on left, date on right
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor("#111827")
          .text(edu.degree, leftMargin, doc.y, { continued: true, width: pageWidth * 0.65 });

        doc
          .fontSize(9.5)
          .font("Helvetica")
          .fillColor("#6b7280")
          .text(dateStr, { align: "right" });

        // Institution
        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor("#3b82f6")
          .text(edu.institution);

        doc.moveDown(0.5);
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SKILLS
    // ─────────────────────────────────────────────────────────────────────────
    const skills = resume.skills || {};
    const hasSkills = [
      skills.technical,
      skills.coreSubjects,
      skills.communication,
      skills.tools,
    ].some((arr) => arr && arr.length > 0);

    if (hasSkills) {
      sectionHeading("Skills");

      const skillRow = (label, values) => {
        if (!values || values.length === 0) return;
        doc
          .fontSize(10.5)
          .font("Helvetica-Bold")
          .fillColor("#111827")
          .text(`${label}: `, { continued: true })
          .font("Helvetica")
          .fillColor("#374151")
          .text(values.join(", "), { lineGap: 3 });
        doc.moveDown(0.3);
      };

      skillRow("Technical",     skills.technical);
      skillRow("Core Subjects", skills.coreSubjects);
      skillRow("Tools",         skills.tools);
      skillRow("Soft Skills",   skills.communication);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PROJECTS
    // ─────────────────────────────────────────────────────────────────────────
    if (resume.projects && resume.projects.length > 0) {
      sectionHeading("Projects");

      resume.projects.forEach((proj, i) => {
        if (i > 0) divider();

        // Project title
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor("#111827")
          .text(proj.title);

        // Tech stack
        if (proj.techStack && proj.techStack.length > 0) {
          doc
            .fontSize(9.5)
            .font("Helvetica")
            .fillColor("#7c3aed")
            .text(`Stack: ${proj.techStack.join(", ")}`);
        }

        // Description
        if (proj.description) {
          doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#374151")
            .text(proj.description, { indent: 10, lineGap: 2 });
        }

        // Links
        const projLinks = [
          proj.githubLink ? `GitHub: ${proj.githubLink}` : null,
          proj.liveLink   ? `Live:   ${proj.liveLink}`   : null,
        ].filter(Boolean);

        if (projLinks.length > 0) {
          doc.moveDown(0.2);
          projLinks.forEach((l) => {
            doc
              .fontSize(9.5)
              .font("Helvetica")
              .fillColor("#1e40af")
              .text(l, { indent: 10 });
          });
        }

        doc.fillColor("#111111").moveDown(0.6);
      });
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed" });
  }
};

export {
  createResume,
  getUserResume,
  getSingleResume,
  updateResume,
  deleteResume,
  downloadResumePDF,
};