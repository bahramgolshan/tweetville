import React, { useState } from "react";
import { useCreateTweet } from "../../services/useTweets";
import toast from "react-hot-toast";

const TweetCreate: React.FC = () => {
  const [text, setText] = useState("");

  const { mutate: createTweet, isPending } = useCreateTweet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    createTweet(text, {
      onSuccess: () => {
        setText("");
        toast.success("Success...");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        rows={4}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Post Tweet"}
      </button>
    </form>
  );
};

export default TweetCreate;
