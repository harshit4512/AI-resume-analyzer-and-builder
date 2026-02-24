import { createResumeService,getSingleResumeService,getUserResumeService,updateResumeService,deleteResumeService } from "../services/resume.service.js";

import PDFDocument from "pdfkit";
import Resume from "../models/resume.model.js";

// create resume
const createResume= async(req,res)=>{
    try{
        const resume = await createResumeService(req.body,req.user._id);
        res.status(201).json({
            message:"resume created successfully",
            resume
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
};

// get all resumes

const getUserResume= async(req,res)=>{
    try{
        const resumes = await getUserResumeService(req.user._id);
        res.status(200).json({
            message:"fetched all resumes",
            resumes
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
};

// get single resumes


const getSingleResume = async (req,res)=>{
    try{
        const resume=await getSingleResumeService(
         req.params.id,
         req.user._id
        );

        if(!resume){
            return res.status(404).json({
                message:"resume not found"
            });
        }
        res.status(200).json({
            message:"single resume fetched",
            resume
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

// update resume


const updateResume= async(req,res)=>{
    try{
        const updated = await updateResumeService(
            req.params.id,
            req.body,
            req.user._id
        );

        if(!updated){
            return res.status(404).json({
                message:"resume not found"
            });

        }
            res.status(200).json({
                message:"resume updated successfully",
                updated
            })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

const deleteResume = async(req,res)=>{
    try{
        const deleted= await deleteResumeService(
            req.params.id,
            req.user._id
        );

        if(!deleted){
            return res.status(404).json({
                message:"resume not found"
            })
        }

        res.status(200).json({
            message:"resume deleted successfully"
        });
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

 const downloadResumePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${resume.title}.pdf`
    );

    doc.pipe(res);

    // ===== CONTENT =====
    doc.fontSize(20).text(resume.personalInfo.fullName);
    doc.moveDown();

    doc.fontSize(12).text(`Email: ${resume.personalInfo.email}`);
    doc.text(`Phone: ${resume.personalInfo.phone || ""}`);
    doc.moveDown();

    if (resume.summary) {
      doc.fontSize(16).text("Summary");
      doc.fontSize(12).text(resume.summary);
      doc.moveDown();
    }

    if (resume.education.length > 0) {
      doc.fontSize(16).text("Education");
      resume.education.forEach((edu) => {
        doc.fontSize(12).text(
          `${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`
        );
      });
      doc.moveDown();
    }

    if (resume.experience.length > 0) {
      doc.fontSize(16).text("Experience");
      resume.experience.forEach((exp) => {
        doc.fontSize(12).text(
          `${exp.role} - ${exp.company} (${exp.startDate} - ${exp.endDate})`
        );
        doc.text(exp.description);
        doc.moveDown();
      });
    }

    if (resume.projects.length > 0) {
      doc.fontSize(16).text("Projects");
      resume.projects.forEach((proj) => {
        doc.fontSize(12).text(proj.title);
        doc.text(proj.description);
        doc.moveDown();
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
    downloadResumePDF

}