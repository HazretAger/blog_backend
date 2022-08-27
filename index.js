import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

mongoose
  .connect(
    "mongodb+srv://admin:Password@cluster0.mugbtzm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("Db err", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  return res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return err;
  }

  console.log("Server started");
});
