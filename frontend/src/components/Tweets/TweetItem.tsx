import React, { useState } from "react";
import { Tweet } from "../../types/tweet";
import { useDeleteTweet } from "../../services/useTweets";
import TweetUpdate from "./TweetUpdate";
import toast from "react-hot-toast";

interface TweetItemProps {
  tweet: Tweet;
}

const TweetItem: React.FC<TweetItemProps> = ({ tweet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteTweet, isPending } = useDeleteTweet();

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet._id.toString());
      toast.success("Tweet deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete tweet");
    }
  };

  return (
    <li>
      <p>{tweet.text}</p>
      <p>Created at: {new Date(tweet.createdAt).toLocaleString()}</p>
      {isEditing ? (
        <TweetUpdate tweet={tweet} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </li>
  );
};

export default TweetItem;
