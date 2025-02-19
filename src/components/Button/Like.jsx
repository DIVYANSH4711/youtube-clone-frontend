export default function Like({ likes }) {
   return (
     <div className="border-2 border-zinc-300 py-1 px-2 rounded-full flex items-center  justify-centerw-full h-8/10 space-x-2">
       <button className="w-7/10 h-4/5 flex items-center space-x-1 border-r-2 pr-3 cursor-pointer text-gray-400 ">
         <img src="/like.png" alt="like" className="h-5 w-5 cursor-pointer" />
         <span>{likes}</span>
       </button>
       <button className="text-gray-400 ">
         <img src="/dislike.png" alt="dislike" className="h-5 w-5 cursor-pointer" />
       </button>
     </div>
   );
 }
 