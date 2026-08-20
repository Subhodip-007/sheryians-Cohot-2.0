import React from "react";
import { UsePost } from "../hooks/UsePost";
const Post = ({loading,handlelike,handleunlike, user, post }) => {
   
  
    
    return (
        <div className="w-full border-b border-zinc-800 p-4">

            {/* User */}
            <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden">
                    <img
                        src={user.ProfileImage}
                        alt={user.Username}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h2 className="text-white text-sm font-semibold">
                        {user.Username}
                    </h2>

                    <p className="text-zinc-500 text-xs">
                        @{user.Username}
                    </p>
                </div>

            </div>

            {/* Post Text */}
            <p className="text-zinc-200 text-sm leading-6 mb-3">
                {post.caption}
            </p>

            {/* Post Image */}
            <div className="w-full h-[300px] bg-zinc-800 rounded-xl overflow-hidden">
                <img
                    src={post.img_url}
                    alt="Post"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 px-2">

               <button
  onClick={() =>
    post.isLike
      ? handleunlike(post._id)
      : handlelike(post._id)
  }
  className="text-zinc-400 hover:text-white"
>
  {post.isLike ? "Unlike" : "Like"}
</button>

                <button className="text-zinc-400 hover:text-white">
                    Comment
                </button>

                <button className="text-zinc-400 hover:text-white">
                    Share
                </button>

            </div>

        </div>
    );
};

export default Post;