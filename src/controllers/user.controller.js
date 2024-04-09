import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import passport from "passport";

import { User } from "../models/user.model.js";

const registerUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .escape(),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .escape(),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be 8-24 characters long")
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const { firstName, lastName, username, password } = req.body;

    if (!errors.isEmpty()) {
      res.render("signup", { firstName, lastName, username });
    }

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
      res.render("dashboard", { user });
    } catch (error) {
      return next(error);
    }
  },
];

const loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/users/login",
});

export { registerUser, loginUser };
