const tweets = [
   { id: 1, content: "Just uploaded a new video!", timestamp: "2 hours ago" },
   { id: 2, content: "React is amazing! 🚀", timestamp: "1 day ago" },
   { id: 3, content: "Thanks for 100K subscribers! ❤️", timestamp: "3 days ago" },
 ];
 
 const TweetList = () => {
   return (
     <div className="space-y-4">
       {tweets.map((tweet) => (
         <div key={tweet.id} className="bg-zinc-800 p-4 rounded-lg">
           <p>{tweet.content}</p>
           <p className="text-sm text-gray-400 mt-1">{tweet.timestamp}</p>
         </div>
       ))}
     </div>
   );
 };
 
 export default TweetList;
 