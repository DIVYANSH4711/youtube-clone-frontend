import { useState } from "react";
import VideoGrid from "./VideoGrid";
import TweetList from "./TweetList";

export default function Channel() {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-y-auto">
      {/* Banner Section */}
      <div className="w-full h-48 md:h-64 bg-zinc-800 flex items-center justify-center">
        <span className="text-lg text-gray-400">Channel Banner</span>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Section */}
        <div className="flex items-center gap-6 py-6">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-300">Avatar</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Channel Name</h1>
            <p className="text-gray-400 text-sm">100K Subscribers • 50 Videos</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 transition-colors ${
              activeTab === "videos"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("tweets")}
            className={`px-4 py-2 transition-colors ${
              activeTab === "tweets"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Tweets
          </button>
        </div>

        {/* Content Section */}
        {activeTab === "videos" ? <VideoGrid /> : <TweetList />}
      </div>
    </div>
  );
}
