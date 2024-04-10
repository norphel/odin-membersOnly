import { body, validationResult } from "express-validator";

import { Message } from "../models/message.model.js";

const sendMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Message title is required")
    .escape(),

  body("text").trim().notEmpty().withMessage("Message is required").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const { title, text } = req.body;
    const author = req.user;

    if (!errors.isEmpty()) {
      return errors;
    }

    try {
      const message = new Message({
        title,
        text,
        author,
      });

      await message.save();
      res.redirect("/dashboard");
    } catch (error) {
      return next(error);
    }
  },
];

export { sendMessage };
