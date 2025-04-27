import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import {
  validateCreateTweet,
  validateUpdateTweet,
  validateDeleteTweet,
} from "../middlewares/validateTweet.js";
import {
  getAllTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} from "../controllers/tweetController.js";

const router = express.Router();

router.get("/test", auth, (req, res) => {
  res.send("hello from tweet routes");
});
router.get("/", auth, getAllTweets);
router.post("/", auth, validateCreateTweet, createTweet);
router.put("/:id", auth, validateUpdateTweet, updateTweet);
router.delete("/:id", auth, validateDeleteTweet, deleteTweet);

export default router;
