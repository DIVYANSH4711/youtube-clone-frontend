import React from "react";

const TweetList = ({ tweets }) => {
  return (
    <div className="space-y-4">
      {
        tweets.length === 0 ?
          (<div className="h-5 w-full flex justify-center items-center font-bold text-red-500">No Tweets Found</div>) :
          (tweets.map((tweet) => (
            <div key={tweet.id} className="bg-zinc-800 p-4 rounded-lg">
              <p>{tweet.content}</p>
              <p className="text-sm text-gray-400 mt-1">{tweet.timestamp}</p>
              <p className="text-sm text-gray-400 mt-1">{tweet.likes} </p>
            </div>
          )))
      }
    </div>
  );
};

export default TweetList;
