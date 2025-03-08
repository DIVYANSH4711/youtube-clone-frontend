import Like from "../Button/Like";
import formatDate from "../../Utilities/dateFomatter";
import axios from "axios";
import { useState } from "react";

const Comment = ({ commentId, fullName, updatedAt, text, userLiked, likes, userAvatar }) => {
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(userLiked);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/likes/toggle/c/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.data || !response.data.data) {
        throw new Error("Invalid Server Response");
      }

      setIsLiked((prev) => !prev);
      setLike((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0">
        <img src={userAvatar || "/man.gif"} alt="User Avatar" className="h-full w-full rounded-full" />
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-medium">{fullName}</p>
          <span className="text-sm text-gray-400">{formatDate(updatedAt)}</span>
        </div>
        <p className="text-sm mt-1">{text}</p>
        <div className="flex items-center space-x-4 mt-2">
          <Like isLiked={isLiked} likes={like} clickFunction={handleLike} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
