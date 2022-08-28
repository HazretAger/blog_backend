import express from "express";
import mongoose from "mongoose";

import { register, login, profile } from "./controllers/UserController.js";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./middlewares/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://admin:Password@cluster0.mugbtzm.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("Db err", err));

const app = express();

app.use(express.json());

app.post("/auth/login", login);

app.post("/auth/register", registerValidation, register);

app.get("/auth/profile", checkAuth, profile);

app.listen(4444, (err) => {
  if (err) {
    return err;
  }

  console.log("Server started");
});
