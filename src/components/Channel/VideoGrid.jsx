 import VideoCard from "../VideoCard/VideoCard";
 {/* 
    _id,
  videoFile,
  thumbnail,
  title,
  owner,
  views,
  uploadDate,
  thumbnailUrl,
  channelAvatarUrl
*/}
 const VideoGrid = ({ videos }) => {
   return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
       { 
          videos.map((video) => (
            <VideoCard 
              key={video._id} 
              _id={video._id}
              thumbnail={video.thumbnail}
              title={video.title}
              views={video.views}
              uploadDate={video.uploadDate}
              likes={video.likes}
            />
          )) 
       }
     </div>
   );
 };
 
 export default VideoGrid;
 