export default function Like({ likes, clickFunction, isLiked = false }) {
  return (
    <div 
      onClick={clickFunction} 
      className={`border-2 py-3 px-2 rounded-full flex items-center justify-center h-6 space-x-2 
                  shadow-md cursor-pointer transition-all 
                  ${isLiked ? "bg-black border-zinc-400 text-white" : "bg-white border-black text-zinc-900"}`}
    >
      <button className="flex items-center py-1 space-x-2 font-medium transition cursor-pointer">
        {isLiked ? <div className="pr-1">Liked</div> : <img src="/Like.svg" alt="Like" />}
        <span>{likes}</span>
      </button>
    </div>
  );
}
