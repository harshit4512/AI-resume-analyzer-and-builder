import express from "express"
import { createResume,getUserResume,getSingleResume,updateResume,deleteResume,downloadResumePDF } from "../controllers/resume.controller.js"
import validate from "../middlewares/validate.middleware.js";
import { resumeValidationSchema } from "../validators/resume.validator.js";

import protect from "../middlewares/auth.middleware.js"

const router=express.Router();

router.post("/",protect,validate(resumeValidationSchema),createResume);

router.get("/",protect,getUserResume);

router.get("/:id",protect,getSingleResume);

router.put("/:id",protect,validate(resumeValidationSchema),updateResume);


router.delete("/:id",protect,deleteResume);

router.get("/:id/pdf", protect, downloadResumePDF);

export default router