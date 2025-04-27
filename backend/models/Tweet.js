import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, maxlength: 140 },
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);
