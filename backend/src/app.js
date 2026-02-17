import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import authroutes from "./routes/auth.routes.js"
const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieparser())

app.use("/api/auth",authroutes)
export default app