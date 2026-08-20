import React, { useRef, useState } from "react";
import { UsePost } from "../hooks/UsePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
    const {loading ,handelCreatePost } = UsePost()
    const [caption, setcaption] = useState("")
    const postimgipfieldref = useRef(null)
    const navigate =useNavigate()
    async function handleSubmit(e){
        e.preventDefault()
        const file = postimgipfieldref.current.files[0]
        await handelCreatePost(file,caption)
        navigate("/feed")
    }
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">

        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Image */}
          <div className="flex flex-col gap-2">
           <label
  htmlFor="postimg"
  className="w-full border border-dashed border-zinc-700 rounded-xl
             px-4 py-6
             flex items-center justify-center
             text-sm font-medium text-zinc-300
             cursor-pointer
             hover:border-zinc-500 hover:bg-zinc-800/50
             transition"
>
  Select Image
</label>

            <input
            ref={postimgipfieldref}
             hidden
              type="file"
              name="postimg"
              id="postimg"
              accept="image/*"
              className="w-full text-sm text-zinc-400
              file:mr-4 file:rounded-lg
              file:border-0 file:bg-zinc-800
              file:px-4 file:py-2
              file:text-sm file:font-medium
              file:text-white
              hover:file:bg-zinc-700
              cursor-pointer"
            />
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="caption"
              className="text-sm font-medium text-zinc-300"
            >
              Caption
            </label>

            <input
            value={caption}
            onChange={(e)=>{setcaption(e.target.value)}}
              type="text"
              name="caption"
              id="caption"
              placeholder="Enter caption"
              className="w-full rounded-lg bg-zinc-800
              border border-zinc-700
              px-4 py-3
              text-white placeholder:text-zinc-500
              outline-none
              focus:border-zinc-500
              focus:ring-1 focus:ring-zinc-500
              transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-white
            px-4 py-3
            text-sm font-semibold text-black
            hover:bg-zinc-200
            active:scale-[0.98]
            transition"
          >
            Create Post
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;