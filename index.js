import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import crossOrigin from "cross-origin";

import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./middlewares/index.js";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations.js";

mongoose
  .connect(
    "mongodb+srv://admin:Password@cluster0.mugbtzm.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("Db err", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(crossOrigin);
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/profile/:id", UserController.getUserById);
// app.get("/auth/profile", checkAuth, UserController.profile);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createPost
);
app.delete("/posts/:id", checkAuth, PostController.deletePost);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.updatePost
);
app.get("/posts", PostController.getAllPosts);
app.get("/posts/:id", PostController.getOnePost);

app.listen(PORT, (err) => {
  if (err) {
    return err;
  }

  console.log("Server started");
});
