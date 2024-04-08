import { Router } from "express";
import multer from "multer";
const upload = multer();
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", upload.none(), registerUser);

export default router;
