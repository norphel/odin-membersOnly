import { Router } from "express";
import multer from "multer";
import { sendMessage } from "../controllers/dashboard.controller.js";

const router = Router();
const upload = multer();

import { Message } from "../models/message.model.js";

router.get("/", async (req, res) => {
  const messages = await Message.find().populate("author").exec();

  if (req.isAuthenticated()) {
    res.render("dashboard", { user: req.user, messages: messages });
  } else {
    res.redirect("/users/login");
  }
});

router.post("/newmessage", upload.none(), sendMessage);

export default router;
