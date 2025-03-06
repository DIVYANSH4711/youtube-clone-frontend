import Like from "../Button/Like";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const VideoPage = ({ avatar }) => {
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [videoData, setVideoData] = useState({});
   const [comments, setComments] = useState([]);
   const [commentsData, setCommentsData] = useState([]);
   const [limitVideo, setLimitVideo] = useState(10);
   const [PageVideo, setPageVideo] = useState(1);
   const [PageComment, setPageComment] = useState(1);
   const [limitComments, setLimitComments] = useState(10);
   const { id } = useParams();
   const fetchVideoData = async () => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/videos/${id}`,
            {
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
               },
            }
         );
         if (!response.data || !response.data.data) {
            throw new Error("Invalid server response");
         }
         setVideoData({ ...videoData, ...response.data.data });
         setPageVideo(PageVideo + 1);
      } catch (error) {
         console.error("Video fetch failed:", error);
      }
   }
   const fetchCommentsData = async () => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/comments/${id}`,
            {
               query: {
                  limit: limitComments,
                  page: PageComment,
               },
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
               },
            }
         );
         if (!response.data || !response.data.data) {
            throw new Error("Invalid server response");
         }
         setCommentsData(response.data.data);
         setComments([...comments, ...response.data.data.comments]);
         setPageComment(PageComment + 1);
      } catch (error) {
         console.error("Comments fetch failed:", error);
      }
   }

   useEffect(() => {
      fetchVideoData();
      fetchCommentsData();
   }, []);
   return (
      <div className="min-h-screen bg-[#0F0F0F] text-white p-4">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Video Player Section */}
               <div className="lg:col-span-2">
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                     <video
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        controls
                        className="w-full h-full rounded-lg"
                        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                     />
                  </div>

                  {/* Video Title and Actions */}
                  <div className="mt-4 space-y-4">
                     <h1 className="text-xl font-semibold">Video Title Goes Here</h1>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-gray-600">
                              <img
                                 src={avatar ? avatar : "/man.gif"}
                                 alt="User Avatar"
                                 className="w-full rounded-full"
                              />
                           </div>
                           <div>
                              <p className="font-medium">Channel Name</p>
                              <p className="text-sm text-gray-400">1M subscribers</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">

                           <button
                              className={`relative overflow-hidden border-2 border-zinc-400 cursor-pointer flex items-center font-bold space-x-2 px-8 py-2 rounded-lg transition-all duration-500 ${isSubscribed
                                 ? "text-white before:absolute before:inset-0 before:bg-red-600 before:w-0 before:h-full before:transition-all before:duration-500 before:hover:w-full"
                                 : "bg-white text-black hover:bg-red-500 hover:text-white"
                                 }`}
                              onClick={() => setIsSubscribed(!isSubscribed)}
                           >
                              <span className="relative z-10">{isSubscribed ? "Subscribed" : "Subscribe"}</span>
                           </button>

                           <Like likes={1200} />
                           <button className="flex items-center text-white font-bold space-x-2 bg-gray-900 border-2 border-zinc-200 px-8 py-2 rounded-full">
                              Share
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-6">
                     <div className="flex items-center space-x-2 mb-4">
                        💬 <h2 className="text-lg font-medium">Comments</h2>
                     </div>

                     <div className="flex space-x-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0">
                           <img src={avatar ? avatar : "/man.gif"} alt="" className="w-full rounded-full" />
                        </div>
                        <textarea
                           placeholder="Add a comment..."
                           className="bg-transparent border-b border-gray-700 rounded-none focus:border-gray-500 resize-none w-full p-2"
                        />
                     </div>

                     <div className="space-y-4">
                        {
                           
                           comments ?
                              <p className="text-gray-400 text-center">No comments yet.</p> :
                              commentsData.comments.map((comment) => (
                                 <Comment
                                    key={comment.id}
                                    username={comment.username}
                                    timeAgo={comment.timeAgo}
                                    text={comment.text}
                                    likes={comment.likes}
                                 />
                              ))}
                     </div>
                  </div>
               </div>

               {/* Video Description and Tags */}
               <div className="lg:col-span-1">
                  <div className="bg-[#272727] border-none p-4 rounded-lg">
                     <div className="h-[calc(100vh-2rem)] overflow-y-auto space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                           <div>123,456 views</div>
                           <div>Jan 1, 2024</div>
                        </div>

                        <div className="text-sm whitespace-pre-line">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

                           {"\n\n"}Links and resources mentioned in this video:
                           {"\n"}• Website: https://example.com
                           {"\n"}• Twitter: @example
                           {"\n"}• GitHub: github.com/example

                           {"\n\n"}Chapters:
                           {"\n"}0:00 Introduction
                           {"\n"}1:23 Getting Started
                           {"\n"}5:45 Main Content
                           {"\n"}10:32 Conclusion
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                           <h3 className="font-medium mb-2">Tags</h3>
                           <div className="flex flex-wrap gap-2">
                              {["programming", "tutorial", "web development"].map((tag) => (
                                 <span
                                    key={tag}
                                    className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                                 >
                                    #{tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default VideoPage;
