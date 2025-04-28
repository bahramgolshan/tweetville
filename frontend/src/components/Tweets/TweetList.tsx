import React from "react";
import TweetItem from "./TweetItem";
import { useTweets } from "../../services/useTweets";

const TweetList: React.FC = () => {
  const { data: tweets, isLoading, error } = useTweets();

  if (isLoading) return <p>Loading tweets...</p>;
  if (error) return <p>Error loading tweets</p>;

  return (
    <div>
      <h2>Tweets</h2>
      {tweets && tweets.length > 0 ? (
        <ul>
          {tweets.map((tweet) => (
            <TweetItem key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      ) : (
        <p>No tweets available</p>
      )}
    </div>
  );
};

export default TweetList;
