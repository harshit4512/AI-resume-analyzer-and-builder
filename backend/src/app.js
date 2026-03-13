import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authroutes from "./routes/auth.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import passport from "passport"
import aiRoutes from "./routes/ai.routes.js"
const app = express();

app.use(passport.initialize());
app.use(express.json())
app.use(cors({
     origin:[ "http://localhost:5173",
         "https://ai-resume-analyzer-and-builder.vercel.app" 
    ],
    credentials: true,
}))
app.use(cookieparser())

app.use("/api/auth",authroutes)
app.use("/api/resume",resumeRoutes)
app.use("/api/ai",aiRoutes)
export default app