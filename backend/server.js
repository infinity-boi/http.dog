import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import statusDogRoutes from "./routes/statusDog.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/dog", statusDogRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is Running on Port ${PORT}`);
    connectMongoDB();
})
