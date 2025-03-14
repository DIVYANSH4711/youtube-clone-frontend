import { useState } from "react";
import formatDate from "../../Utilities/dateFomatter";
import axios from "axios";

const Tweet = ({ tweetId, author, content, timestamp, likes, avatar, isLiked: initialIsLiked }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked); // Initialize from backend
  const [likeCount, setLikeCount] = useState(likes); // Set likes from backend

  const handleLike = async () => {
    try {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1)); // FIXED this line

      await axios.post(
        `${import.meta.env.VITE_API_URL}/likes/toggle/t/${tweetId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error liking/unliking tweet:", error);
      setIsLiked((prev) => !prev); // Revert on failure
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1)); // Revert correctly
    }
  };

  return (
    <div className="bg-black my-3 rounded-xl p-4 border-2 border-zinc-700 transition-colors w-full max-w-full">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Author & Timestamp */}
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-white truncate">{author}</h3>
            <span className="text-sm text-gray-400">{formatDate(timestamp)}</span>
          </div>

          {/* Tweet Content */}
          <div className="mt-2 text-white p-2 rounded-sm font-bold break-words w-full">
            {content}
          </div>

          {/* Like Button */}
          <div className="flex items-center space-x-6 mt-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              {/* Heart Icon */}
              <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                <img
                  src={isLiked ? "/redHeart.png" : "/heart.png"}
                  alt="Like"
                  className="w-full h-full object-contain invert"
                />
              </div>

              {/* Like Count */}
              <span className="text-lg font-bold">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
