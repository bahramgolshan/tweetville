import TweetCreate from "../components/Tweets/TweetCreate";
import TweetList from "../components/Tweets/TweetList";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Tweet App</h1>
      <TweetCreate />
      <TweetList />
    </div>
  );
};

export default Home;
