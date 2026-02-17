import dotenv from "dotenv";
dotenv.config();
import connectdb from "./src/db/db.js";
import app from "./src/app.js"
connectdb()
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server is running at",PORT);
})