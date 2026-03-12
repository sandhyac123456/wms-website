import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import adminRouter from "./routes/admin.route.js"
import jobRouter from "./routes/job.route.js"
import contactRouter from "./routes/contact.route.js";
import serviceRouter from "./routes/service.route.js";
import applicationRouter from "./routes/application.route.js";
import blogRouter from "./routes/blog.route.js";
import categoryRouter from "./routes/category.route.js";
import aiRouter from "./ai/ai.routes.js";

const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/admin/auth", authRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/blog",blogRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/ai",aiRouter);
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("hii")
})

app.listen(port, (req, res)=>{
    connectDB()
    console.log(`server started on ${port}`)
})