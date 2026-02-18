import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authroutes from "./routes/auth.routes.js"
const app = express();

app.use(express.json())
app.use(cors({
     origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieparser())

app.use("/api/auth",authroutes)
export default app