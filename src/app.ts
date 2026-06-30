import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from 'cors';
import config from "./config";

import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { commentRoutes } from "./modules/comment/comment.route";
import { postRoutes } from "./modules/post/post.route";

const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", async(req:Request, res:Response) => {
    res.send("Hello prisma!");
})


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes); 
app.use("/api/comments", commentRoutes);

export default app;