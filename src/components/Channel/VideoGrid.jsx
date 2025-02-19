const videos = [
   { id: 1, title: "Intro to Web Dev", views: "10K", timestamp: "2 days ago" },
   { id: 2, title: "Advanced CSS Tips", views: "5K", timestamp: "1 week ago" },
   { id: 3, title: "React State Management", views: "15K", timestamp: "3 days ago" },
 ];
 
 const VideoGrid = () => {
   return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
       {videos.map((video) => (
         <div key={video.id} className="bg-zinc-800 p-4 rounded-lg">
           <div className="w-full h-40 bg-gray-700 flex items-center justify-center rounded">
             <span className="text-gray-400">Thumbnail</span>
           </div>
           <h3 className="mt-2 font-semibold">{video.title}</h3>
           <p className="text-sm text-gray-400">
             {video.views} Views • {video.timestamp}
           </p>
         </div>
       ))}
     </div>
   );
 };
 
 export default VideoGrid;
 