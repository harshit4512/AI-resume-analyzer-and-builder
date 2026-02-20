import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authroutes from "./routes/auth.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
const app = express();

app.use(express.json())
app.use(cors({
     origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieparser())

app.use("/api/auth",authroutes)
app.use("/api/resume",resumeRoutes)
export default app