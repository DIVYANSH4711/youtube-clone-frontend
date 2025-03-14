import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const CommunityTab = ({ username }) => {
  const [isAddTweetOpen, setIsAddTweetOpen] = useState(false);
  const [newTweetContent, setNewTweetContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("global");

  const [globalTweets, setGlobalTweets] = useState([]);
  const [personalTweets, setPersonalTweets] = useState([]);
  const [subscriptionTweets, setSubscriptionTweets] = useState([]);

  const [pageGlobal, setPageGlobal] = useState(1);
  const [pagePersonal, setPagePersonal] = useState(1);
  const [pageSubscription, setPageSubscription] = useState(1);

  const [hasMoreGlobal, setHasMoreGlobal] = useState(true);
  const [hasMorePersonal, setHasMorePersonal] = useState(true);
  const [hasMoreSubscription, setHasMoreSubscription] = useState(true);

  useEffect(() => {
    fetchTweets(selectedTab, 1);
  }, [selectedTab]);

  const fetchTweets = async (type, page) => {
    try {
      let url = "";
      if (type === "global") url = `tweets/global?page=${page}`;
      if (type === "personal") url = `tweets/user/me?page=${page}`;
      if (type === "subscription") url = `tweets/user/following?page=${page}`;

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${url}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const tweets = response.data.data;

      if (tweets.length === 0) {
        if (type === "global") setHasMoreGlobal(false);
        if (type === "personal") setHasMorePersonal(false);
        if (type === "subscription") setHasMoreSubscription(false);
      }

      if (type === "global") {
        setGlobalTweets((prev) => (page === 1 ? tweets : [...prev, ...tweets]));
        setPageGlobal(page);
      } else if (type === "personal") {
        setPersonalTweets((prev) => (page === 1 ? tweets : [...prev, ...tweets]));
        setPagePersonal(page);
      } else if (type === "subscription") {
        setSubscriptionTweets((prev) => (page === 1 ? tweets : [...prev, ...tweets]));
        setPageSubscription(page);
      }
    } catch (error) {
      console.error(`Error fetching ${type} tweets:`, error);
    }
  };

  const loadMoreTweets = () => {
    if (selectedTab === "global") {
      fetchTweets("global", pageGlobal + 1);
    } else if (selectedTab === "personal") {
      fetchTweets("personal", pagePersonal + 1);
    } else if (selectedTab === "subscription") {
      fetchTweets("subscription", pageSubscription + 1);
    }
  };

  const handleAddTweet = async () => {
    if (!newTweetContent.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tweets/`,
        { content: newTweetContent },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const newTweet = response.data.data;

      // Optimistically update personal tweets
      setPersonalTweets((prev) => [newTweet, ...prev]);

      // Close modal and reset input
      setIsAddTweetOpen(false);
      setNewTweetContent("");
    } catch (error) {
      console.error("Error adding tweet:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center relative">
      <div className="w-full max-w-2xl py-8 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mr-10 text-white">Community</h1>
          <button
            onClick={() => setIsAddTweetOpen(true)}
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
          >
            <PlusIcon />
            <span>Add Tweet</span>
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          {["global", "subscription", "personal"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold ${selectedTab === tab ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Add Tweet Modal */}
        {isAddTweetOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold text-white mb-4">Add a Tweet</h2>
              <textarea
                className="w-full p-2 bg-gray-700 text-white rounded-md outline-none resize-none"
                rows="3"
                placeholder="What's on your mind?"
                value={newTweetContent}
                onChange={(e) => setNewTweetContent(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsAddTweetOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTweet}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Selected Tweets */}
        <div>
          {selectedTab === "global" &&
            globalTweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweetId={tweet._id}
                author={tweet.owner?.username}
                avatar={tweet.owner?.avatar}
                content={tweet.content}
                timestamp={tweet.createdAt}
                likes={tweet.likes}
                isLiked={tweet.isLiked}
              />
            ))}
          {selectedTab === "global" && hasMoreGlobal && <button onClick={loadMoreTweets} className="py-1 px-2 text-white font-bold border-2 border-zinc-400 bg-cyan-800 rounded-full">Load More</button>}

          {selectedTab === "subscription" &&
            subscriptionTweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweetId={tweet._id}
                author={tweet.owner?.username}
                avatar={tweet.owner?.avatar}
                content={tweet.content}
                timestamp={tweet.createdAt}
                likes={tweet.likes}
                isLiked={tweet.isLiked}
              />
            ))}
          {selectedTab === "subscription" && hasMoreSubscription && <button onClick={loadMoreTweets}  className="py-1 px-2 text-white font-bold border-2 border-zinc-400 bg-cyan-800 rounded-full">Load More</button>}

          {selectedTab === "personal" &&
            personalTweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweetId={tweet._id}
                author={tweet.owner?.username}
                avatar={tweet.owner?.avatar}
                content={tweet.content}
                timestamp={tweet.createdAt}
                likes={tweet.likes}
                isLiked={tweet.isLiked}
              />
            ))}
          {selectedTab === "personal" && hasMorePersonal && <button onClick={loadMoreTweets}  className="py-1 px-2 text-white font-bold border-2 border-zinc-400 bg-cyan-800 rounded-full">Load More</button>}
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
