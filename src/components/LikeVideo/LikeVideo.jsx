import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard/VideoCard';
export default function likeVideo() {
   const [likedVideos, setLikedVideos] = useState(null)
   const [limit, setLimit] = useState(9)
   const [page, setPage] = useState(0)
   const fetchLikedVideos = async () => {
      setPage(page + 1)
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/likes/videos`,
            {
               params: {
                  limit,
                  page
               },
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
               }
            }
         )
         if (!response.data || !response.data.data) {
            throw new Error("Invalid Server Response")
         }
         console.log("Liked Videos:", response.data.data)
         setLikedVideos(response.data.data)
      } catch (error) {
         console.error("Liked Video fetch failed:", error)
      }
   }
   useEffect(() => {
      fetchLikedVideos();
   }, [])
   return (
      <>
         <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {
                  likedVideos == null ? 
                  [...Array(9)].map((_, i) => (
                     <VideoCard key={i} index={i} />
                  )) : (likedVideos.length === 0) ? <div className="flex justify-center items-center font-extrabold text-lg"> No Liked Video Found </div> :
                     (likedVideos.map((video, index) => (
                        <VideoCard
                           key={index}
                           videoId={video.videoId}
                           title={video.title}
                           channelName={video.channelName}
                           views={video.views}
                           uploadDate={video.uploadDate}
                           thumbnailUrl={video.thumbnailUrl}
                           channelAvatarUrl={video.channelAvatarUrl}
                        />
                     )))
               }
            </div>
         </main>
      </>
   )
}