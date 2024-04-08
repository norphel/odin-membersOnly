import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

import { User } from "../models/user.model.js";

const registerUser = [
  body("firstName")
    .trim()
    .isEmpty()
    .withMessage("First Name is required")
    .escape(),

  body("lastName")
    .trim()
    .isEmpty()
    .withMessage("Last Name is required")
    .escape(),

  body("username")
    .trim()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .escape(),

  body("username").custom(async (value) => {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      throw new Error("A user with given e-mail already exists!");
    }
  }),

  body("password")
    .trim()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be 8-24 characters long")
    .escape(),

  async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        membershipStatus: false,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return next(error);
    }
  },
];

export { registerUser };
