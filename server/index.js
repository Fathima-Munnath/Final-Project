import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";



const app = express();
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://food-website-fawn-six.vercel.app"],
    methods:["GET","PUT","POST", "DELETE","OPTIONS","PATCH"],
    credentials:true,
}))
app.use(cookieParser())
const port = 3000;

connectDB();
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test", (req, res) => {
    res.send("test");
});


app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


//http://localhost:3000/api/user/login