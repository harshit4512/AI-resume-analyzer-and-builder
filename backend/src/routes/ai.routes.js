import express from "express"
import { analyzeResume } from "../controllers/ai.controller.js"
import multer from "multer"
import protect from "../middlewares/auth.middleware.js"
const router = express.Router()

const upload = multer()

router.post("/analyze", protect, upload.any(), analyzeResume)

export default router

