import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [videoFile, setVideoFile] = useState(null);
   const [thumbnail, setThumbnail] = useState(null);
   const [thumbnailPreview, setThumbnailPreview] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadMessage, setUploadMessage] = useState("");

   const handleVideoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setVideoFile(file);
      }
   };

   const handleThumbnailChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setThumbnail(file);
         setThumbnailPreview(URL.createObjectURL(file));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title || !description || !videoFile || !thumbnail) {
         alert("All fields are required!");
         return;
      }

      setIsUploading(true);
      setUploadMessage("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      try {
         await axios.post(
            `${import.meta.env.VITE_API_URL}/videos/`,
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
               },
            });

         setUploadMessage("🎉 Video uploaded successfully!");
      } catch (error) {
         console.error("Upload Failed:", error);
         setUploadMessage("Upload failed. Please try again.");
      } finally {
         setIsUploading(false);
      }
   };

   return (
      <div className="flex justify-center items-center w-full min-h-screen bg-black p-6">
         <div className="w-full max-w-lg p-6 bg-zinc-900 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-white text-center chakra-petch-light mb-4">UPLOAD VIDEO</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
               {/* Title */}
               <div>
                  <label className="text-gray-300 block chakra-petch-light mb-1">Title:</label>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     disabled={isUploading}
                     className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                  />
               </div>

               {/* Description */}
               <div>
                  <label className="text-gray-300 block chakra-petch-light mb-1">Description:</label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     disabled={isUploading}
                     rows="3"
                     className="w-full px-4 py-2 bg-gray-800 chakra-petch-light text-white border border-gray-700 rounded-md focus:ring focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                  />
               </div>

               {/* Video Upload */}
               <div>
                  <label className="text-gray-300  chakra-petch-light block mb-1">Upload Video:</label>
                  <input
                     type="file"
                     accept="video/*"
                     onChange={handleVideoChange}
                     disabled={isUploading}
                     className="w-full bg-gray-800 chakra-petch-light text-gray-400 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-zinc-600 file:text-white hover:file:bg-zinc-500 disabled:opacity-50"
                  />
               </div>

               {/* Thumbnail Upload */}
               <div>
                  <label className="text-gray-300 block mb-1">Upload Thumbnail:</label>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleThumbnailChange}
                     disabled={isUploading}
                     className="w-full bg-gray-800 chakra-petch-light text-gray-400 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-zinc-600 file:text-white hover:file:bg-zinc-500 disabled:opacity-50"
                  />
               </div>

               {/* Thumbnail Preview */}
               {thumbnailPreview && (
                  <div className="mt-2">
                     <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-40 object-cover rounded-md border border-gray-700" />
                  </div>
               )}

               {/* Upload Button */}
               <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 chakra-petch-light bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {isUploading ? "Uploading..." : "Upload Video"}
               </button>

               {uploadMessage && (
                  <div className="p-3 mb-4 text-center chakra-petch-light text-white bg-green-600 rounded-md">
                     {uploadMessage}
                  </div>
               )}
            </form>
         </div>
      </div>
   );
};

export default Upload;
