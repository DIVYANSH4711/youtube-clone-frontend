import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "../VideoCard/VideoCard";

export default function Home() {
   const [suggestedVideos, setSuggestedVideos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);

   const fetchSuggestedVideos = async () => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/videos/suggestion/me`,
            {
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
               },
            }
         );

         if (!response.data || !response.data.data) {
            throw new Error("Invalid Server Response");
         }

         if (response.data.data.length === 0) {
            setHasMore(false);
         } else {
            setSuggestedVideos((prev) => [...prev, ...response.data.data]);
         }

         setLoading(false);
      } catch (error) {
         console.error("Suggested Video fetch failed:", error);
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchSuggestedVideos();
   }, [page]);

   return (
      <main className="p-4">
         <h1 className="text-xl font-bold mb-4">Suggested Videos</h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && suggestedVideos.length === 0
               ? [...Array(9)].map((_, i) => <VideoCard key={i} index={i} />)
               : suggestedVideos.map((video) => (
                    <VideoCard
                       key={video._id}
                       _id={video._id}
                       title={video.title}
                       createdAt={video.createdAt}
                       views={video.views}
                       thumbnail={video.thumbnail}
                       owner={video.owner?.fullName}
                       ownerUsername={video.owner?.username}
                       channelAvatarUrl={video.owner?.avatar}
                    />
                 ))}
         </div>

         {/* Load More Button */}
         {hasMore && (
            <div className="flex justify-center items-center mt-4">
               <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                  onClick={() => setPage((prev) => prev + 1)}
               >
                  Load More
               </button>
            </div>
         )}
      </main>
   );
}
