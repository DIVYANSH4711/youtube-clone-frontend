import React, { useState, useEffect } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import axios from 'axios';

export default function WatchHistory() {
   const [videos, setVideos] = useState([]);
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);

   useEffect(() => {
      const fetchVideo = async () => {
         if (loading || !hasMore) return; 

         setLoading(true);

         try {
            const response = await axios.get(
               `${import.meta.env.VITE_API_URL}/users/history?page=${page}`,
               {
                  withCredentials: true,
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  },
               }
            );

            if (!response.data || !Array.isArray(response.data.data)) {
               throw new Error("Error while retrieving history");
            }

            if (response.data.data.length === 0) {
               setHasMore(false); 
            } else {
               setVideos((prev) => [...prev, ...response.data.data]);
            }
         } catch (error) {
            console.error("Error fetching history:", error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchVideo();
   }, [page]); 

   return (
      <main className="p-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
               <VideoCard
                  key={video._id || index}
                  _id={video._id}
                  title={video.title}
                  owner={video.owner?.fullName}
                  views={video.views}
                  ownerUsername={video.owner?.username}
                  createdAt={video.createdAt}
                  thumbnail={video.thumbnail}
                  channelAvatarUrl={video.owner?.avatar}
               />
            ))}
         </div>

         {/* Load More Button */}
         {hasMore && (
            <div className="flex justify-center mt-6">
               <button
                  onClick={() => setPage((prev) => prev + 1)} 
                  disabled={loading}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
               >
                  {loading ? "Loading..." : "Load More"}
               </button>
            </div>
         )}
      </main>
   );
}
