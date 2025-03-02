import React from 'react';
import { useState } from 'react';
import VideoCard from '../VideoCard/VideoCard';
export default function likeVideo() {
   const [likedVideos, setLikedVideos] = useState(null)
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