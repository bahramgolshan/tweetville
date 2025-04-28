import Tweet from "../models/Tweet.js";
import { validationResult } from "express-validator";

export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ updatedAt: -1 })
      .populate("user", "email");
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTweet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text } = req.body;

  try {
    const tweet = await Tweet.create({ text, user: req.user.id });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTweet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { text } = req.body;

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    if (tweet.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    tweet.text = text;
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTweet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const tweet = await Tweet.findById(id);

    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    if (tweet.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await tweet.deleteOne();

    res.status(200).json({ message: "Tweet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
