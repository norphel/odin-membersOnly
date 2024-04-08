import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";

import connectDB from "./database/db.js";
import { DB_NAME } from "./constants.js";

dotenv.config({
  path: "./env",
});

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed!!! ", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGODB_URI}/${DB_NAME}`,
      autoRemove: "native",
    }),
  })
);
app.use(passport.session());

import "./authentication/passportUtils.js";

// import routes
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/users", userRouter);
