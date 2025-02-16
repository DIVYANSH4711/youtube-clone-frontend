export default function VideoCard({ title = 'Testing', channelName = 'Divyansh', views, uploadDate, thumbnailUrl, channelAvatarUrl }) {
  const formattedViews = new Intl.NumberFormat("en-US", { notation: "compact" }).format(views);

  // Function to calculate time ago manually
  function timeAgo(date) {
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
    <div className="bg-zinc-7 border-1 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-white">
      {/* Thumbnail */}
      <div className="relative aspect-video p-2 overflow-hidden">
        <img
          src={thumbnailUrl || "/Thumbnail.png"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            <img
              src={channelAvatarUrl || "/man.gif"}
              alt={channelName}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">{title}</h3>
            <p className="text-zinc-400 text-sm  hover:underline russo-one-regular cursor-pointer">{channelName}</p>
            <p className="text-zinc-500 text-xs">
              {formattedViews} views • {timeAgo(uploadDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
