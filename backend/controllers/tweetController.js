import Tweet from "../models/Tweet.js";
import { validationResult } from "express-validator";

export const getAllTweets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        message: "Invalid 'page' parameter. It must be a positive number.",
      });
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({
        message: "Invalid 'limit' parameter. It must be between 1 and 100.",
      });
    }

    const skip = (page - 1) * limit;

    const [tweets, total] = await Promise.all([
      Tweet.find()
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "_id email fullname"),
      Tweet.countDocuments(),
    ]);

    res.status(200).json({
      tweets,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyTweets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (isNaN(page) || page < 1) {
      return res.status(400).json({
        message: "Invalid 'page' parameter. It must be a positive number.",
      });
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({
        message: "Invalid 'limit' parameter. It must be between 1 and 100.",
      });
    }

    const skip = (page - 1) * limit;

    const userId = req.user.user._id;
    
    const [tweets, total] = await Promise.all([
      Tweet.find({ user: userId })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "_id email fullname"),
      Tweet.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      tweets,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
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
    const tweet = await Tweet.create({ text, user: req.user.user._id });
    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
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
    if (tweet.user.toString() !== req.user.user._id)
      return res.status(403).json({ message: "Not authorized" });

    tweet.text = text;
    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
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
    if (tweet.user.toString() !== req.user.user._id)
      return res.status(403).json({ message: "Not authorized" });

    await tweet.deleteOne();

    res.status(200).json({ message: "Tweet deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
