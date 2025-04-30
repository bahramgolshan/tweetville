import React, { useState } from "react";
import { Tweet } from "../../types/tweet";
import { useUpdateTweet } from "../../services/useTweets";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TweetUpdateProps {
  tweet: Tweet;
  onCancel: () => void;
}

const MAX_TWEET_LENGTH = 140;

const TweetUpdate: React.FC<TweetUpdateProps> = ({ tweet, onCancel }) => {
  const [text, setText] = useState(tweet.text);

  const { mutate: updateTweet, isPending } = useUpdateTweet();

  const isTooLong = text.length > MAX_TWEET_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isTooLong) return;

    updateTweet(
      { id: tweet._id, text: trimmed },
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
      <div className="flex flex-col gap-3">
        <Textarea
          className="w-full p-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between gap-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground ps-1">
            <span
              className={
                isTooLong ? "text-red-500 font-medium" : "text-muted-foreground"
              }
            >
              {text.length}/{MAX_TWEET_LENGTH}
            </span>
          </div>
          <div className="flex gap-2">
            <Button onClick={onCancel} size="sm" variant="ghost">
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending || !text.trim() || isTooLong}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TweetUpdate;
