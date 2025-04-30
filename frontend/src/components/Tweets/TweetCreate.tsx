import React, { useState } from "react";
import { useCreateTweet } from "../../services/useTweets";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { MAX_TWEET_LENGTH } from "@/config/constants";

const TweetCreate: React.FC = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const { mutate: createTweet, isPending } = useCreateTweet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_TWEET_LENGTH) return;
    createTweet(trimmed, {
      onSuccess: () => {
        setText("");
        toast.success("Success...");
      },
    });
  };

  const isTooLong = text.length > MAX_TWEET_LENGTH;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {user?.fullname
                  ?.split(" ")
                  .map((chunk: string) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">Welcome! 🎉</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="p-4"
              placeholder={`What's happening ${user?.fullname}?`}
            />
            <div className="flex justify-between gap-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground ps-1">
                <span
                  className={
                    isTooLong
                      ? "text-red-500 font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {text.length}/{MAX_TWEET_LENGTH}
                </span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setText("")} size="sm" variant="ghost">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPending || !text.trim() || isTooLong}
                >
                  {isPending ? <Loader2 className="animate-spin" /> : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TweetCreate;
