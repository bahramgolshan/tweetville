import React, { forwardRef } from "react";
import { Tweet } from "../../types/tweet";
import { useDeleteTweet } from "../../services/useTweets";
import TweetUpdate from "./TweetUpdate";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

interface TweetItemProps {
  tweet: Tweet;
  activeTab: "all" | "mine";
}

const TweetItem = forwardRef<HTMLLIElement, TweetItemProps>(
  ({ tweet, activeTab }, ref) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const { mutate: deleteTweet, isPending } = useDeleteTweet();
    const { user } = useAuth();

    const isOwner = tweet.user._id === user?._id;

    const handleDelete = async () => {
      if (confirm("Are you sure?")) {
        try {
          await deleteTweet(tweet._id.toString());
          toast.success("Tweet deleted");
        } catch (error: any) {
          toast.error(error.message || "Failed to delete");
        }
      }
    };

    return (
      <li ref={ref}>
        <p>
          {tweet.user.fullname}: {tweet.text}
        </p>
        <p>
          Updated at:
          {" " +
            formatDistanceToNow(new Date(tweet.updatedAt).toLocaleString(), {
              includeSeconds: true,
            })}
        </p>
        {activeTab == "mine" && isOwner && (
          <>
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
          </>
        )}
      </li>
    );
  }
);

export default TweetItem;
