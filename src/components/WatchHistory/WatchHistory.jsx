import React from 'react';
import { useState } from 'react';
import VideoCard from '../VideoCard/VideoCard';
export default function WatchHistory() {

   const videos = [
      {
         videoId: "Nal0yZUbIsA",
         title: "Artificial Intelligence around us",
         channelName: "Tech World",
         views: "1.5M",
         uploadDate: "2023-01-15",
         thumbnailUrl: "https://i.ytimg.com/vi/Nal0yZUbIsA/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwng8k9Y8k9Y8k9Y8k9Y8k9Y8k9Y8k9Y8k9Y8=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "RIJuzYrf388",
         title: "Aive - Discover our technology in 2 minutes",
         channelName: "Aive Official",
         views: "500K",
         uploadDate: "2022-11-20",
         thumbnailUrl: "https://i.ytimg.com/vi/RIJuzYrf388/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnh7h8h7h8h7h8h7h8h7h8h7h8h7h8h7h8h7=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "focwVr7ikV8",
         title: "Understand NFC in under 2 minutes!",
         channelName: "Tech Quickie",
         views: "800K",
         uploadDate: "2023-03-10",
         thumbnailUrl: "https://i.ytimg.com/vi/focwVr7ikV8/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwng5g5g5g5g5g5g5g5g5g5g5g5g5g5g5g5=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "KKB_Cg4fCLU",
         title: "Simple Machines with TECHNOLOGY (3-minute)",
         channelName: "EduTech",
         views: "300K",
         uploadDate: "2022-09-05",
         thumbnailUrl: "https://i.ytimg.com/vi/KKB_Cg4fCLU/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnj9j9j9j9j9j9j9j9j9j9j9j9j9j9j9j9=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "HCQH7G2hGPY",
         title: "2-Minute Talks: What's Next for People Ops",
         channelName: "HR Insights",
         views: "250K",
         uploadDate: "2023-02-25",
         thumbnailUrl: "https://i.ytimg.com/vi/HCQH7G2hGPY/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwng3g3g3g3g3g3g3g3g3g3g3g3g3g3g3g3=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "uD4izuDMUQA",
         title: "Timelapse of the Future: A Journey to the End of Time",
         channelName: "Science Time",
         views: "2M",
         uploadDate: "2023-04-01",
         thumbnailUrl: "https://i.ytimg.com/vi/uD4izuDMUQA/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnk6k6k6k6k6k6k6k6k6k6k6k6k6k6k6=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "K4JhruinbWc",
         title: "How a Differential Works",
         channelName: "AutoTech",
         views: "1.2M",
         uploadDate: "2022-12-10",
         thumbnailUrl: "https://i.ytimg.com/vi/K4JhruinbWc/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwng2g2g2g2g2g2g2g2g2g2g2g2g2g2g2g2=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "GuCdsyCWmt8",
         title: "The Engineer Guy - How Vinyl Records Work",
         channelName: "Engineer Guy",
         views: "900K",
         uploadDate: "2023-01-20",
         thumbnailUrl: "https://i.ytimg.com/vi/GuCdsyCWmt8/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnh8h8h8h8h8h8h8h8h8h8h8h8h8h8h8=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "jiejNAUwcQ8",
         title: "Applied Science - How LCDs Work",
         channelName: "Applied Science",
         views: "750K",
         uploadDate: "2023-03-15",
         thumbnailUrl: "https://i.ytimg.com/vi/jiejNAUwcQ8/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwng4g4g4g4g4g4g4g4g4g4g4g4g4g4g4g4=s88-c-k-c0x00ffffff-no-rj"
      },
      {
         videoId: "1RgLh4rgaRQ",
         title: "Smarter Every Day - Helicopter Physics",
         channelName: "Smarter Every Day",
         views: "1.8M",
         uploadDate: "2023-02-05",
         thumbnailUrl: "https://i.ytimg.com/vi/1RgLh4rgaRQ/hqdefault.jpg",
         channelAvatarUrl: "https://yt3.ggpht.com/ytc/AAUvwnk7k7k7k7k7k7k7k7k7k7k7k7k7k7k7=s88-c-k-c0x00ffffff-no-rj"
      },
   ]
   return (
      <>
         <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {
                  videos.map((video, index) => (
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
                  ))
               }
            </div>
         </main>
      </>
   )
}