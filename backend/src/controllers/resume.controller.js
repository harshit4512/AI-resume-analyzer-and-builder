// Purpose of this file

// This file acts as the bridge between the frontend and the service layer.

// Its responsibilities are:

// Receive the HTTP request.
// Extract data from req.
// Call the appropriate service.
// Send the HTTP response.
// Handle errors.

import { createResumeService, getSingleResumeService, getUserResumeService, updateResumeService, deleteResumeService } from "../services/resume.service.js";

import generatePDF from "../utils/generatePDF.js";
import renderTemplate from "../utils/renderTemplate.js";
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


const downloadResumePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // 1. Build the full HTML string for this template
    const html = renderTemplate(resume);

    // 2. Puppeteer renders it to PDF bytes
    const pdfBuffer = await generatePDF(html);

    // 3. Send PDF back to frontend
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.title || "resume"}.pdf"`
    );
    res.end(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error);
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