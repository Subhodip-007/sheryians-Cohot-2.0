import { useContext } from "react";
import { getFeed } from "../services/post.api.js";
import { PostContext } from "../post.context.jsx";

export const UsePost = () => {
    const {
        loading,
        feed,
        setloading,
        setfeed
    } = useContext(PostContext);

    const handleGetFeed = async () => {
        try {
            setloading(true);

            const data = await getFeed();

            console.log("Data received in hook:", data);

            setfeed(data.feed);

        } catch (err) {
            console.error("Error getting feed:", err);
        } finally {
            setloading(false);
        }
    };

    return {
        loading,
        feed,
        handleGetFeed
    };
};