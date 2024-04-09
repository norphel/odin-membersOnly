import { Router } from "express";
import multer from "multer";
const upload = multer();
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", upload.none(), registerUser);

router.get("/login", (req, res) => {
  res.render("login");
});
export default router;
