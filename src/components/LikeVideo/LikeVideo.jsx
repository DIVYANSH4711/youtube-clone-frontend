import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard/VideoCard';
export default function likeVideo() {
   const [likedVideos, setLikedVideos] = useState([])
   const [page, setPage] = useState(1)
   const [loadMore, setLoadMore] = useState(true)
   const fetchLikedVideos = async () => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/likes/videos?page=${page}`,
            {
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
               }
            }
         )
         if (!response.data || !response.data.data) {
            throw new Error("Invalid Server Response")
         }

         if (response.data.data.length === 0)
            setLoadMore(false)
         setLikedVideos((prev) => [...prev, ...response.data.data])
      } catch (error) {
         console.error("Liked Video fetch failed:", error)
      }
   }
   useEffect(() => {
      fetchLikedVideos();
   }, [page])
   return (
      <>
         <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {
                  likedVideos.length === 0 ? 
                  [...Array(9)].map((_, i) => (
                     <VideoCard key={i} index={i} />
                  )) :  
                     (likedVideos.map((video, index) => (
                        <VideoCard
                           key={video._id}
                           _id={video._id}
                           title={video.title}
                           owner={video.owner?.fullName}
                           views={video.views}
                           createdAt={video.createdAt}
                           thumbnail={video.thumbnail}
                           channelAvatarUrl={video.owner?.avatar}
                        />
                     )))
               }
            </div>

            <div className='flex justify-center items-center mt-3'>
               <button className='p-1 rounded-sm bg-cyan-700 text-black'
               onClick={ () => setPage((prev)=>prev+1) }>Load More</button>
            </div>
         </main>
      </>
   )
}