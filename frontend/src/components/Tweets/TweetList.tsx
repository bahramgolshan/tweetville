import React, { useRef, useCallback } from "react";
import TweetItem from "./TweetItem";
import { useTweetsQuery } from "../../services/useTweets";

type TweetListProps = {
  activeTab: "all" | "mine";
};

const TweetList: React.FC<TweetListProps> = ({ activeTab }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useTweetsQuery(activeTab);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTweetRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) return <p>Loading tweets...</p>;
  if (error) return <p>Error loading tweets</p>;

  return (
    <div className="flex flex-col justify-center">
      {data?.pages.map((page, pageIndex) =>
        page.tweets.map((tweet, tweetIndex) => {
          if (
            pageIndex === data.pages.length - 1 &&
            tweetIndex === page.tweets.length - 1
          ) {
            return (
              <TweetItem
                ref={lastTweetRef}
                key={tweet._id}
                tweet={tweet}
                activeTab={activeTab}
              />
            );
          } else {
            return (
              <TweetItem key={tweet._id} tweet={tweet} activeTab={activeTab} />
            );
          }
        })
      )}
      {isFetchingNextPage && <p>Loading more...</p>}
      <hr className="mt-5 py-1" />
      <p className="text-center text-xs text-mute-foregournd">
        No more tweets!
      </p>
    </div>
  );
};

export default TweetList;
