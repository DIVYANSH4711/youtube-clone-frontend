export default function Like({ likes }) {
  return (
    <div className="border-2 border-zinc-300 py-2 px-2 rounded-full flex items-center justify-center h-6 space-x-2 bg-white shadow-md cursor-pointer">
      <button className="flex items-center py-1 space-x-2 text-gray-600 font-medium hover:text-blue-500 transition cursor-pointer">
        {/* Professional Thumbs-up SVG */}
        <img src="/Like.svg" alt="Like" className="" />
        <span>{likes}</span>
      </button>
    </div>
  );
}
