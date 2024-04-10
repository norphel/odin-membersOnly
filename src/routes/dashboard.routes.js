import { Router } from "express";
import multer from "multer";
import { sendMessage } from "../controllers/dashboard.controller.js";

const router = Router();
const upload = multer();

import { Message } from "../models/message.model.js";

router.get("/", async (req, res) => {
  const user = req.user;
  const messages = await Message.find().populate("author").exec();
  console.log(messages);
  console.log(user);
  res.render("dashboard", { user, messages });
});

router.post("/newmessage", upload.none(), sendMessage);

export default router;
