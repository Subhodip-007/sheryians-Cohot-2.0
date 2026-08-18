import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [post, setpost] = useState(null);
    const [loading, setloading] = useState(false);
    const [feed, setfeed] = useState([]);

    return (
        <PostContext.Provider
            value={{
                loading,
                post,
                feed,
                setloading,
                setfeed,
                setpost
            }}
        >
            {children}
        </PostContext.Provider>
    );
};