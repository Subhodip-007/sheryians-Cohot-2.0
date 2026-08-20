
import { useContext, useEffect } from "react";
import { createPost, getFeed ,likePost,unlikePost } from "../services/post.api.js";
import { PostContext } from "../post.context.jsx";

export const UsePost = () => {
  const {
    loading,
    feed,
    setloading,
    setfeed,
  } = useContext(PostContext);

  const handleGetFeed = async () => {
    try {
      setloading(true);

      const data = await getFeed();

      console.log("Feed data:", data);

      setfeed(data.feed || []);
    } catch (err) {
      console.error("Error getting feed:", err);
    } finally {
      setloading(false);
    }
  };

  const handelCreatePost = async (file, caption) => {
    try {
      setloading(true);

      const data = await createPost(file, caption);

      console.log("Created post data:", data);
      console.log("Created post:", data.post);

      setfeed((prevFeed) => [
        data.post,
        ...(prevFeed || []),
      ]);

      return data.post;

    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    } finally {
      setloading(false);
    }
  };
  const handlelike=async(post)=>{
    setloading(true);
    const data = await likePost(post)
    await handleGetFeed()
    setloading(false)
  }
  const handleunlike=async(post)=>{
    setloading(true);
    const data = await unlikePost(post)
    handleGetFeed()
    setloading(false)
  }
  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    handleGetFeed,
    handelCreatePost,
    handlelike,
    handleunlike
  };
};