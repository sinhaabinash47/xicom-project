import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/useRoute.js"
import cors from "cors";

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use("/api/user", route)
const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("DB Connect Successfully");
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });
}).catch(error => console.log(error));
