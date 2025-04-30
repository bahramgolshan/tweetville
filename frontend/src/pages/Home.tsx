import TweetCreate from "../components/Tweets/TweetCreate";
import TweetList from "../components/Tweets/TweetList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <>
      {/* Create Tweet */}
      <div className="mb-6">
        <TweetCreate />
      </div>
      <hr className="my-6" />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="px-5 me-3">
            All Tweets
          </TabsTrigger>
          <TabsTrigger value="mine" className="px-5">
            My Tweets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TweetList activeTab="all" />
        </TabsContent>
        <TabsContent value="mine">
          <TweetList activeTab="mine" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Home;
