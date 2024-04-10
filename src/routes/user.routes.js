import { Router } from "express";
import multer from "multer";
const upload = multer();
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("signup");
  }
});

router.post("/signup", upload.none(), registerUser);

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

router.post("/login", upload.none(), loginUser);
export default router;
