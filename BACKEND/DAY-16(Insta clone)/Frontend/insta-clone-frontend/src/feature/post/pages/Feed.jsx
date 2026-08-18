import React, { useEffect } from "react";
import Post from "../components/Post";
import { UsePost } from "../hooks/UsePost";


const Feed = () => {
  const {loading,feed,post,handleGetFeed} = UsePost();
  useEffect(()=>{
    handleGetFeed()
  },[])
  
  
  
  if(loading || !feed ){
    return <main><h1>feed is loading....</h1></main>
  }
  return (
    <div className="feed-page w-screen h-screen bg-zinc-900 flex items-center justify-center">
      
      {/* Mobile Feed Container */}
      <div className="feed-cont w-[375px] h-[700px] bg-zinc-950 rounded-3xl overflow-y-auto">

        {/* Feed Header */}
        <div className="sticky top-0 z-10 h-14 bg-zinc-950 border-b border-zinc-800 flex items-center px-5">
          <h1 className="text-white text-lg font-semibold">
            Home
          </h1>
        </div>

        {/* Posts */}
        <div className="flex flex-col">
          {feed.map(post=>{
            return <Post user={post.user} post={post} />
          })}
        </div>

      </div>
    </div>
  );
};

export default Feed;