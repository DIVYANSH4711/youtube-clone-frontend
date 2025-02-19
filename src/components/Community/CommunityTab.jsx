import { useState } from "react";
import Tweet from "./Tweet";

// Custom SVG Plus Icon
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const CommunityTab = () => {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "This is my first tweet!",
      timestamp: "2h ago",
      likes: 10,
      comments: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      isPersonal: false,
    },
    {
      id: 2,
      author: "Jane Doe",
      content: "Hello, Twitter!",
      timestamp: "1h ago",
      likes: 20,
      comments: 8,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      isPersonal: false,
    },
  ]);

  const [isAddTweetOpen, setIsAddTweetOpen] = useState(false);
  const [showPersonalOnly, setShowPersonalOnly] = useState(false);
  const [newTweetContent, setNewTweetContent] = useState("");

  const handleAddTweet = () => {
    if (!newTweetContent.trim()) return;

    const newTweet = {
      id: tweets.length + 1,
      author: "You",
      content: newTweetContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      isPersonal: true,
    };

    setTweets([newTweet, ...tweets]);
    setIsAddTweetOpen(false);
    setNewTweetContent("");
  };

  const filteredTweets = showPersonalOnly
    ? tweets.filter((tweet) => tweet.isPersonal)
    : tweets;

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center relative">
      <div className={`w-full max-w-2xl py-8 px-4 transition-all duration-300 ${isAddTweetOpen ? "blur-md" : ""}`}>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPersonalOnly(!showPersonalOnly)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${
                showPersonalOnly
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              My Tweets
            </button>
            <button
              onClick={() => setIsAddTweetOpen(true)}
              className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
              <PlusIcon />
              <span>Add Tweet</span>
            </button>
          </div>
        </div>

        {/* Tweets Section */}
        <div className="space-y-4">
          {filteredTweets.length > 0 ? (
            filteredTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
          ) : (
            <p className="text-gray-400 text-center">No tweets found.</p>
          )}
        </div>
      </div>

      {/* Add Tweet Dialog */}
      {isAddTweetOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96 relative">
            <h2 className="text-2xl font-bold mb-4 text-white">Create Tweet</h2>
            <textarea
              value={newTweetContent}
              onChange={(e) => setNewTweetContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full h-24 p-3 bg-dark-bg border border-dark-border rounded-lg resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={280}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-400">
                {280 - newTweetContent.length} characters remaining
              </span>
              <button
                onClick={handleAddTweet}
                disabled={!newTweetContent.trim()}
                className="px-6 py-2 bg-gray-500 text-white rounded-full font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tweet
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsAddTweetOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTab;
