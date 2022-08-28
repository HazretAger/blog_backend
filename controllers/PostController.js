import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
