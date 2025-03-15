import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
const Subscriptions = () => {
  const [channel, setChannel] = useState([]);
  const Id = JSON.parse(localStorage.getItem("user"))._id
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  useEffect(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/subscriptions/c/${Id}?page=${page}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      )


      if (!response.data || !response.data.data)
        throw new Error("Some Error Occurred While retrieving The Subscribed Channels")

      if (response.data.data.length === 0)
          setHasMore(false)

      setChannel([...channel, ...response.data.data])
      setPage((prev) => prev + 1)
    } catch (error) {
      console.log(error)
    }
  }, [page])

  const handleUnsubscribe = (id) => {
    setChannel(channel.filter((channel) => channel.id !== id));
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
          {channel.length === 0 ? (
            <p className="text-gray-400 text-center">You have no subscribed channels.</p>
          ) : (
            channel.map((channel, index) => (
              <div
                key={channel.id}
                className={`rounded-sm p-5 border-2 border-zinc-200 flex items-start gap-6 transition-all hover:scale-[1.02] duration-300 ${
                  index % 2 === 0 ? "bg-[#22242A]" : "bg-[#060606]"
                }`}
              >
                {/* Channel Avatar */}
                <img src={channel.avatar} alt={channel.fullName} className="w-16 h-16 rounded-full cursor-pointer object-cover" />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    {/* Channel Name & Subscribers */}
                    <div>
                      <h2 className="text-xl cursor-pointer font-semibold">{channel.name}</h2>
                      <p className="text-sm text-gray-400 mt-1">{channel.subscribers} subscribers</p>
                    </div>

                    {/* Unsubscribe Button */}
                    <button
                      onClick={() => handleUnsubscribe(channel.id)}
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
      </div>
      <div className="mt-2 p-2 bg-zinc-100 border-blue-400 rounded-sm ">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Subscriptions;
