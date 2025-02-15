export default function VideoCard({ index }) {
  return (
    <div key={index} className="group">
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-zinc-800">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Project thumbnail"
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <div>
            <h3 className="font-medium">Project {index + 1}</h3>
            <p className="text-sm text-zinc-400 flex items-center">
              <span className="mr-1">🔗</span>
              {Math.floor(Math.random() * 10)}K Forks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}