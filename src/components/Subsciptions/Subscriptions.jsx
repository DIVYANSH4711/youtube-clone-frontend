import { Link } from "react-router-dom";
import { useState } from "react";

const mockChannels = [
  {
    id: 1,
    name: "Tech Insights",
    subscribers: "1.2M",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "Latest tech reviews and insights",
  },
  {
    id: 2,
    name: "Code Masters",
    subscribers: "850K",
    avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Programming tutorials and coding challenges",
  },
  {
    id: 3,
    name: "Digital Creators",
    subscribers: "2.1M",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Digital content creation and tips",
  },
];

const Subscriptions = () => {
  const [channels, setChannels] = useState(mockChannels);

  const handleUnsubscribe = (id) => {
    setChannels(channels.filter((channel) => channel.id !== id));
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
                key={channel.id}
                className={`rounded-sm p-5 border-2 border-zinc-200 flex items-start gap-6 transition-all hover:scale-[1.02] duration-300 ${
                  index % 2 === 0 ? "bg-[#22242A]" : "bg-[#060606]"
                }`}
              >
                {/* Channel Avatar */}
                <img src={channel.avatar} alt={channel.name} className="w-16 h-16 rounded-full cursor-pointer object-cover" />

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
    </div>
  );
};

export default Subscriptions;
