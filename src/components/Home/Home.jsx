import VideoCard from "../VideoCard/VideoCard";
export default function Home() {
   return (
      <main className="ml-64 p-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
               <VideoCard key={i} index={i} />
            ))}
         </div>
      </main>
   );
}