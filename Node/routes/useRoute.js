import express from "express";
import { create } from "../controller/userController.js";

import cors from "cors";

const route = express.Router();
route.use(cors());

route.post("/create", create); 

export default route;
