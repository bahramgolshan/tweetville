import React, { useState } from "react";
import { Tweet } from "../../types/tweet";
import { useUpdateTweet } from "../../services/useTweets";
import toast from "react-hot-toast";

interface TweetUpdateProps {
  tweet: Tweet;
  onCancel: () => void;
}

const TweetUpdate: React.FC<TweetUpdateProps> = ({ tweet, onCancel }) => {
  const [text, setText] = useState(tweet.text);

  const { mutate: updateTweet, isPending } = useUpdateTweet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTweet(
      { id: tweet._id, text },
      {
        onSuccess: () => {
          onCancel();
          toast.success("Success...");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TweetUpdate;
