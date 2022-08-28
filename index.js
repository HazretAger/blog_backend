import express from "express";
import mongoose from "mongoose";

import { register, login, profile } from "./controllers/UserController.js";
import { createPost, getAllPosts } from "./controllers/PostController.js";
import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations.js";

import checkAuth from "./middlewares/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://admin:Password@cluster0.mugbtzm.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("Db err", err));

const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.json());

app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/profile", checkAuth, profile);

app.post("/posts", checkAuth, postCreateValidation, createPost);
app.get("/posts", getAllPosts);

app.listen(PORT, (err) => {
  if (err) {
    return err;
  }

  console.log("Server started");
});
