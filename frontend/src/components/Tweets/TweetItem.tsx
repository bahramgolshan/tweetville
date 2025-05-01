import React, { forwardRef } from "react";
import { Tweet } from "../../types/tweet";
import { useDeleteTweet } from "../../services/useTweets";
import TweetUpdate from "./TweetUpdate";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

interface TweetItemProps {
  tweet: Tweet;
  activeTab: "all" | "mine";
}

const TweetItem = forwardRef<HTMLDivElement, TweetItemProps>(
  ({ tweet, activeTab }, ref) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const { mutate: deleteTweet } = useDeleteTweet();
    const { user } = useAuth();

    const isOwner = tweet.user._id === user?._id;

    const handleEdit = () => setIsEditing(true);

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
      <div ref={ref} className="flex flex-col gap-2 mb-5">
        <div className="flex flex-col items-start gap-2 rounded-lg shadow border p-3 text-left text-sm transition-all">
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={tweet.user.fullname} />
                <AvatarFallback>
                  {tweet.user.fullname
                    ?.split(" ")
                    .map((chunk: string) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{tweet.user.fullname}</div>
                <div className="line-clamp-1 text-xs">{tweet.user.email}</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(tweet.updatedAt).toLocaleString(),
                    {
                      includeSeconds: true,
                      addSuffix: true,
                    }
                  )}
                </div>
                {activeTab == "mine" && isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={false}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex w-full flex-col gap-1">
            {isEditing ? (
              <TweetUpdate tweet={tweet} onCancel={() => setIsEditing(false)} />
            ) : (
              <div
                className="flex-1 whitespace-pre-wrap p-4 text-sm"
                style={{
                  overflow: "hidden",
                  overflowWrap: "anywhere",
                }}
              >
                {tweet.text}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default TweetItem;
