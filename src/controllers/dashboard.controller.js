import { body, validationResult } from "express-validator";

import { User } from "../models/user.model.js";
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
      return res.status(400).json({ errors: errors.array() });
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

const joinMembership = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Passcode is required")
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { passcode } = req.body;
    if (passcode === "The Odin Project") {
      try {
        const currentUser = await User.findById(req.user.id);
        currentUser.membershipStatus = true;
        await currentUser.save();
        res.redirect("/dashboard");
      } catch (error) {
        next(error);
      }
    } else {
      res.render("membership", {
        user: req.user,
        error: "Incorrect passcode",
      });
    }
  },
];

export { sendMessage, joinMembership };
