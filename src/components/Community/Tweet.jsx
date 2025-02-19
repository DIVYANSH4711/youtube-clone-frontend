import { useState } from "react";

const Tweet = ({ author, content, timestamp, likes, avatar }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-zinc-700 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition-colors w-full max-w-full">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          {/* Author & Timestamp */}
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-white truncate">{author}</h3>
            <span className="text-sm text-gray-400">{timestamp}</span>
          </div>

          {/* Tweet Content */}
          <div className="mt-2 text-white break-words w-full">
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
              {/* Heart Icon - Preventing Image Distortion */}
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src={isLiked ? "/redHeart.png" : "/heart.png"}
                  alt="Like"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Like Count */}
              <span className="text-sm">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
