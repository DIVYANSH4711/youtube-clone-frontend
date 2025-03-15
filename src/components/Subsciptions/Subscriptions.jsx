import { useState, useEffect } from "react";
import axios from "axios";

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/subscriptions/c/${userId}?page=${page}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.data || !response.data.data) {
          throw new Error("Error retrieving subscribed channels");
        }

        if (response.data.data.length === 0) {
          setHasMore(false);
          return;
        }

        setChannels((prev) => [...prev, ...response.data.data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubscriptions();
  }, [page]); 

  const handleUnsubscribe = (id) => {
    setChannels((prev) => prev.filter((channel) => channel._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6 pt-20">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Subscribed Channels</h1>
        </header>

        {/* Channels List */}
        <div className="space-y-4">
          {channels.length === 0 ? (
            <p className="text-gray-400 text-center">You have no subscribed channels.</p>
          ) : (
            channels.map((channel, index) => (
              <div
                key={channel._id} 
                className={`rounded-sm p-5 border-2 border-zinc-200 flex items-start gap-6 transition-all hover:scale-[1.02] duration-300 ${
                  index % 2 === 0 ? "bg-[#22242A]" : "bg-[#060606]"
                }`}
              >
                {/* Channel Avatar */}
                <img
                  src={channel.channel?.avatar}
                  alt={channel.channel?.fullName}
                  className="w-16 h-16 rounded-full cursor-pointer object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    {/* Channel Name & Subscribers */}
                    <div>
                      <h2 className="text-xl chakra-petch-semibold-italic cursor-pointer font-semibold">
                        {channel.channel?.fullName}
                      </h2>
                    </div>

                    {/* Unsubscribe Button */}
                    <button
                      onClick={() => handleUnsubscribe(channel._id)}
                      className="relative overflow-hidden px-4 py-2 text-white cursor-pointer bg-transparent border border-gray-400 rounded-md transition-all duration-300 group"
                    >
                      <span className="relative z-10">Unsubscribe</span>
                      <div className="absolute inset-0 w-full h-full bg-red-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
