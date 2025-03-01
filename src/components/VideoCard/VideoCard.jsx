import React from "react";
import { NavLink } from "react-router-dom";

export default function VideoCard({ 
  videoId, 
  title, 
  channelName, 
  views, 
  uploadDate, 
  thumbnailUrl, 
  channelAvatarUrl 
}) {
  // Check if data is still loading (i.e., missing videoId)
  const isLoading = !videoId;

  const formattedViews = views
    ? new Intl.NumberFormat("en-US", { notation: "compact" }).format(views)
    : "—";

  // Function to calculate time ago manually
  function timeAgo(date) {
    if (!date) return "—";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  return (
    <div className="bg-zinc-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-white">
      {/* Thumbnail */}
      <NavLink to={isLoading ? "#" : `/video/${videoId}`} className="block relative aspect-video overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-zinc-700 animate-pulse" />
        ) : (
          <img
            src={thumbnailUrl || "/Thumbnail.png"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </NavLink>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Channel Avatar */}
          <NavLink to={isLoading ? "#" : `/channel/${channelName}`} className="flex-shrink-0">
            {isLoading ? (
              <div className="w-10 h-10 bg-zinc-700 rounded-full animate-pulse" />
            ) : (
              <img
                src={channelAvatarUrl || "/man.gif"}
                alt={channelName}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            )}
          </NavLink>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="h-5 bg-zinc-700 rounded-md w-3/4 animate-pulse mb-2" />
            ) : (
              <NavLink to={`/video/${videoId}`} className="block">
                <h3 className="text-white font-semibold text-sm line-clamp-2 hover:text-red-400 transition-colors duration-200">
                  {title}
                </h3>
              </NavLink>
            )}

            {isLoading ? (
              <div className="h-4 bg-zinc-700 rounded-md w-1/2 animate-pulse mb-1" />
            ) : (
              <NavLink to={`/channel/${channelName}`} className="text-zinc-400 text-sm hover:underline cursor-pointer">
                {channelName}
              </NavLink>
            )}

            {isLoading ? (
              <div className="h-4 bg-zinc-700 rounded-md w-1/3 animate-pulse" />
            ) : (
              <p className="text-zinc-500 text-xs">
                {formattedViews} views • {timeAgo(uploadDate)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
