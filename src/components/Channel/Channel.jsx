import { useEffect, useState } from "react";
import VideoGrid from "./VideoGrid";
import TweetList from "./TweetList";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Channel() {
  const [activeTab, setActiveTab] = useState("videos");
  const [channelData, setChannelData] = useState({});
  const [videoData, setVideoData] = useState([]);
  const [tweetData, setTweetData] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const params = useParams();
  const username = params.username;
  
  const fetchChannelData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/u/dashboard/${username}/stats`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      )
      if (!response.data || !response.data.data) {
        throw new Error("Invalid server response");
      }
      setChannelData({ ...channelData, ...response.data.data });
      setIsSubscribed(response.data.data.isSubscribed);
    } catch (error) {
      console.error("Channel fetch failed:", error);
    }
  }

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/u/dashboard/${username}/videos`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      )
      if (!response.data || !response.data.data) {
        throw new Error("Invalid server response");
      }
      setVideoData(response.data.data);
    } catch (error) {
      console.error("Video fetch failed:", error);
    }
  }

  const fetchTweetData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tweets/user/${username}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      )

      if (!response.data || !response.data.data) {
        throw new Error("Invalid server response");
      }
      setTweetData(response.data.data);
    } catch (error) {
      console.error("Tweet fetch failed:", error);
    }
  }

  useEffect(() => {
    fetchChannelData();
  }, []);

  useEffect(() => {
    if (activeTab === "videos") {
      fetchVideoData();
    } else {
      fetchTweetData();
    }
  }, [activeTab]);

  const handleToggleSubscription = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/subscriptions/c/${channelData._id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!response.data || !response.data.data) {
        throw new Error("Invalid server response");
      }
      setIsSubscribed(!isSubscribed);
      if (isSubscribed) {
        setChannelData((prev) => ({
          ...prev,
          totalSubscribers: prev.totalSubscribers - 1,
        }));
      } else {
        setChannelData((prev) => ({
          ...prev,
          totalSubscribers: prev.totalSubscribers + 1,
        }));
      }
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  }
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-y-auto">
      {/* Banner Section */}
      <div className="w-full h-48 md:h-64 bg-black flex items-center justify-center">
        <img src={channelData.coverImage ? channelData.coverImage : "/coverImage.png"} alt="CoverImage" className="w-full h-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Section */}
        <div className="flex items-center gap-6 py-6">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
            <img src={channelData.avatar} alt="" className="h-4/5 w-4/5 rounded-full" />
          </div>
          <div>
            <h1 className=" big-shoulders-stencil-Big-Shoulders-Stencil text-4xl">{channelData.fullName}</h1>
            <p className="text-gray-400 text-sm">{channelData.totalSubscribers} Subscribers • {channelData.totalVideos} Videos</p>
          </div>
          <div>
            <button
              className={`py-1 px-2 border-2 cursor-pointer font-bold rounded-md ${isSubscribed ? "bg-black text-white border-white" : "bg-red-600 text-black border-white"} `}
              onClick={handleToggleSubscription}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 transition-colors ${activeTab === "videos"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab("tweets")}
            className={`px-4 py-2 transition-colors ${activeTab === "tweets"
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Tweets
          </button>
        </div>

        {/* Content Section */}
        {activeTab === "videos" ? (videoData.length > 0 ? <VideoGrid videos={videoData} /> : <div className="text-center">No More Video Found</div>) : <TweetList tweets={tweetData} />}
      </div>
    </div>
  );
}
