import Like from "../Button/Like";

const Comment = ({ username, timeAgo, text, likes, userAvatar}) => {
  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0">
         <img src={userAvatar ? userAvatar : '/man.gif'} alt="" className="h-full rounded-full"/>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-medium">{username}</p>
          <span className="text-sm text-gray-400">{timeAgo}</span>
        </div>
        <p className="text-sm mt-1">{text}</p>
        <div className="flex items-center space-x-4 mt-2">
          <Like likes={likes} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
