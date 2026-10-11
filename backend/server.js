import dotenv from "dotenv";
dotenv.config();
import connectdb from "./src/db/db.js";
import app from "./src/app.js"
connectdb()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server is running at",PORT);
})

app.use((err, req, res, next) => {
  console.error("Unhandled error on", req.method, req.originalUrl, err);
  res.status(500).json({ message: err.message || "Server error" });
});