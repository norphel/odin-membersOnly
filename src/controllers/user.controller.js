import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  // validate
  // check if user already exist
  //
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
};

export { registerUser };
