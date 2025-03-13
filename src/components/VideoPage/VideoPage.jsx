import Like from "../Button/Like";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import formatDate from "../../Utilities/dateFomatter.js"; 

const VideoPage = () => {
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [videoData, setVideoData] = useState({});
   const [comments, setComments] = useState([]);
   const [limitComments, setLimitComments] = useState(10);
   const [PageComment, setPageComment] = useState(1);
   const [commentText, setCommentText] = useState("");


   const [isLiked, setIsliked] = useState(false);
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
         setVideoData(response.data.data);
         setIsSubscribed(response.data.data.isSubscribed);
         setIsliked(response.data.data.isLiked)
      } catch (error) {
         console.error("Video fetch failed:", error);
      }
   };

   const fetchCommentsData = async () => {
      try {
         const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/comments/${id}?limit=${limitComments}&page=${PageComment}`,
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
         setComments((prev) => [...prev, ...response.data.data.comments]);
         setPageComment((prev) => prev + 1);
      } catch (error) {
         console.error("Comments fetch failed:", error);
      }
   };

   useEffect(() => {
      fetchVideoData();
   }, []);
   useEffect(() => {
      fetchCommentsData();
   }, [])

   const handleAddComment = async () => {
      if (!commentText.trim()) return;

      try {
         const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/comments/${id}`,
            { content: commentText },
            {
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  "Content-Type": "application/json",
               },
            }
         );

         if (!response.data || !response.data.data) {
            throw new Error("Invalid server response");
         }

         setComments((prevComments) => [response.data.data, ...prevComments]);
         setCommentText("");
      } catch (error) {
         console.error("Failed to add comment:", error);
      }
   };

   const subscription = async () => {
      try {
         const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/subscriptions/c/${videoData.owner._id}`,
            {},
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
         setIsSubscribed(!isSubscribed);
         if (isSubscribed) {
            setVideoData((prev) => ({
               ...prev,
               owner: {
                  ...prev.owner,
                  subscriberCount: prev.owner.subscriberCount - 1,
               },
            }));
         } else {
            setVideoData((prev) => ({
               ...prev,
               owner: {
                  ...prev.owner,
                  subscriberCount: prev.owner.subscriberCount + 1,
               },
            }));
         }
      } catch (error) {
         console.error("Failed to subscribe:", error);
      }
   };
   

   const likedVideo = async () => {
      try {
         const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/likes/toggle/v/${videoData._id}`,
            {},
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
         setIsliked(!isLiked)
         if(isLiked) {
            setVideoData((prev) =>({
               ...prev,
               likes: prev.likes - 1
            }))
         } else {
            setVideoData((prev) => ({
               ...prev,
               likes: prev.likes + 1
            }))
         }
      } catch (error) {
         console.error("Failed to like video:", error);
      }
   }

   return (
      <div className="min-h-screen bg-[#0F0F0F] text-white ">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Video Player Section */}
               <div className="lg:col-span-2">
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                     <video
                        src={videoData.videoFile}
                        controls
                        className="w-full h-full rounded-lg"
                        poster={videoData.thumbnail}
                     />
                  </div>

                  {/* Video Title and Actions */}
                  <div className="mt-4 space-y-4">
                     <h1 className="text-xl font-semibold">
                        {videoData.title || (
                           <div className="h-6 w-1/4 rounded-sm bg-zinc-400"></div>
                        )}
                     </h1>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-gray-600">
                              <img
                                 src={videoData?.owner?.avatar || "/man.gif"}
                                 alt="User Avatar"
                                 className="w-full h-full rounded-full"
                              />
                           </div>
                           <div>
                              <span className="font-medium">
                                 {videoData?.owner?.fullName || "Unknown User"}
                              </span>
                              <p className="text-sm text-gray-400">
                                 {videoData?.owner?.subscriberCount || 0} subscribers
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                           <button
                              className={`relative overflow-hidden border-2 border-zinc-400 cursor-pointer flex items-center font-bold space-x-2 px-8 py-2 rounded-lg transition-all duration-500 ${
                                 isSubscribed
                                    ? "text-white before:absolute before:inset-0 before:bg-red-600 before:w-0 before:h-full before:transition-all before:duration-500 before:hover:w-full"
                                    : "bg-white text-black hover:bg-red-500 hover:text-white"
                              }`}
                              onClick={subscription}
                           >
                              <span className="relative z-10">
                                 {isSubscribed ? "Subscribed" : "Subscribe"}
                              </span>
                           </button>

                           <Like key={videoData._id} 
                                 likes={videoData.likes} 
                                 clickFunction={likedVideo} 
                                 isLiked={isLiked}
                           />
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
                           <img
                              src={videoData?.owner?.avatar || "/man.gif"}
                              alt="user-avatar"
                              className="w-full h-full rounded-full"
                           />
                        </div>
                        <textarea
                           placeholder="Add a comment..."
                           value={commentText}
                           onChange={(e) => setCommentText(e.target.value)}
                           className="bg-transparent border-b border-gray-700 rounded-none focus:border-gray-500 resize-none w-full p-2"
                        />
                        <button
                           onClick={handleAddComment}
                           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-1/2 rounded-lg transition-all cursor-pointer"
                        >
                           Comment
                        </button>
                     </div>

                     <div className="space-y-4">
                        {comments.length === 0 ? (
                           <p className="text-gray-400 text-center">
                              No comments yet.
                           </p>
                        ) : (
                           comments.map((comment) => (
                              <Comment
                                 key={comment._id}
                                 commentId={comment._id}
                                 fullName={
                                    comment?.owner?.fullName ||
                                    comment?.owner?.username ||
                                    "Anonymous"
                                 }
                                 updatedAt={formatDate(comment?.updatedAt || "")}
                                 text={comment.content || ""}
                                 likes={comment.likes || 0}
                                 userLiked={comment.isLiked || false}
                                 userAvatar={comment.owner?.avatar || ""}
                              />
                           ))
                        )}
                     </div>
                     <div className="flex justify-center mt-3 mb-2">
                        <button
                           onClick={fetchCommentsData}
                           className="bg-zinc-900 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                           Load More
                        </button>
                     </div>
                  </div>
               </div>

               {/* Video Description and Tags */}
               <div className="lg:col-span-1">
                  <div className="bg-[#272727] border-none p-4 rounded-lg">
                     <div className="h-[calc(100vh-2rem)] overflow-y-auto space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                           <div>{videoData.views} views</div>
                           <div>{formatDate(videoData.createdAt)}</div>
                        </div>
                        <div className="text-sm whitespace-pre-line">
                           {videoData.description}
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


