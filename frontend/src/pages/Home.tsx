import { useState } from "react";
import TweetCreate from "../components/Tweets/TweetCreate";
import TweetList from "../components/Tweets/TweetList";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Tweet App</h1>
      <h3>{user?.fullname}</h3>
      <TweetCreate />
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Tweets
        </button>
        <button
          onClick={() => setActiveTab("mine")}
          className={`px-4 py-2 rounded ${
            activeTab === "mine" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          My Tweets
        </button>
      </div>
      <TweetList activeTab={activeTab} />
    </div>
  );
};

export default Home;
