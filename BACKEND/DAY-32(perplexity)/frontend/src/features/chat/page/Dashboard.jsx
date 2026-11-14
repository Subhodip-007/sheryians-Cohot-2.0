

// import React, { useEffect } from "react";

// import { useSelector } from "react-redux";

// import { useChat } from "../hooks/useChat";



// const Dashboard = () => {

//     const chat = useChat()

//     const { user } = useSelector(state => state.auth);



//     console.log(user);

//     useEffect(()=>{

//         chat.initializeSocketConnection()

//     },[])



//     return (

//         <div>

//             <h1>Dashboard</h1>

//             {user && <h2>Welcome, {user.username}</h2>}

//         </div>

//     );

// };



// export default Dashboard;


import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { Plus, Shrink, Trash, Sun, Moon } from "lucide-react";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
    const chat = useChat();

    const { user } = useSelector((state) => state.auth);

    const { chats, messages, currentChatId, isLoading, theme } =
        useSelector((state) => state.chat);

    const [inputMessage, setInputMessage] = useState("");

    // Boolean flag for clean conditional styling
    const isDark = theme === "dark";

    // Centralized Neobrutalist Theme Styles
    const styles = {
        appBg: isDark
            ? "bg-[#121212] text-[#F4F1EA]"
            : "bg-[#F4F1EA] text-[#1A1A1A]",

        sidebarBg: isDark
            ? "bg-[#1E1E1E] border-[#F4F1EA]"
            : "bg-white border-[#1A1A1A]",

        headerBg: isDark
            ? "bg-[#FF5722] border-[#F4F1EA] text-white"
            : "bg-[#FF5722] border-[#1A1A1A] text-white",

        chatItemDefault: isDark
            ? "bg-[#2A2A2A] text-white border-[#F4F1EA] shadow-[2px_2px_0px_0px_#F4F1EA] hover:bg-[#333333]"
            : "bg-white text-[#1A1A1A] border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] hover:bg-gray-50",

        chatItemActive: isDark
            ? "bg-[#FFCC00] text-[#1A1A1A] border-[#F4F1EA] shadow-[2px_2px_0px_0px_#F4F1EA]"
            : "bg-[#FFCC00] text-[#1A1A1A] border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]",

        footerBg: isDark
            ? "bg-[#181818] border-[#F4F1EA] text-gray-200"
            : "bg-gray-50 border-[#1A1A1A] text-[#1A1A1A]",

        userBubble: isDark
            ? "bg-[#1F6E5D] text-white border-[#F4F1EA] shadow-[4px_4px_0px_0px_#F4F1EA]"
            : "bg-[#A3E4D7] text-[#1A1A1A] border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]",

        aiBubble: isDark
            ? "bg-[#1E1E1E] text-[#F4F1EA] border-[#F4F1EA] shadow-[4px_4px_0px_0px_#F4F1EA]"
            : "bg-white text-[#1A1A1A] border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]",

        formBg: isDark
            ? "bg-[#1E1E1E] border-[#F4F1EA]"
            : "bg-white border-[#1A1A1A]",

        inputField: isDark
            ? "bg-[#2A2A2A] text-white placeholder-gray-400 border-[#F4F1EA] shadow-[2px_2px_0px_0px_#F4F1EA]"
            : "bg-white text-[#1A1A1A] placeholder-gray-500 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]",

        sendBtn: isDark
            ? "bg-[#F4F1EA] text-[#1A1A1A] border-[#F4F1EA] shadow-[4px_4px_0px_0px_#FF5722]"
            : "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[4px_4px_0px_0px_#FF5722]",

        toggleBtn: isDark
            ? "bg-[#2A2A2A] text-[#FFCC00] border-[#F4F1EA] shadow-[3px_3px_0px_0px_#F4F1EA]"
            : "bg-amber-100 text-[#1A1A1A] border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]"
    };

    useEffect(() => {
        chat.initializeSocketConnection();
        chat.fetchAllChats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputMessage.trim()) return;

        await chat.sendMessage({
            message: inputMessage,
            chatId: currentChatId
        });

        setInputMessage("");
    };

    return (
        <div className={`flex h-screen font-sans transition-colors duration-200 ${styles.appBg}`}>

            {/* SIDEBAR */}
            <div className={`w-80 border-r-4 flex flex-col transition-colors duration-200 ${styles.sidebarBg}`}>

                <div className={`p-4 border-b-4 flex justify-between items-center font-bold ${styles.headerBg}`}>
                    <span><Shrink /></span>

                    <button
                        onClick={chat.startNewChat}
                        className="bg-black text-white px-3 py-1 border-2 border-white shadow-[2px_2px_0px_0px_#FFF] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                        <span><Plus size={26} /></span>
                    </button>
                </div>

                {/* Chat History List */}
                <div className="chat flex-1 overflow-y-auto p-4 space-y-2">
                    {chats.map((c) => (
                        <div
                            key={c._id}
                            onClick={() => chat.getMessageOfChat(c._id)}
                            className={`p-3 border-2 cursor-pointer font-medium transition-all flex items-center justify-between gap-2 ${
                                currentChatId === c._id
                                    ? styles.chatItemActive
                                    : styles.chatItemDefault
                            }`}
                        >
                            <span className="truncate">
                                {c.title || "Untitled Chat"}
                            </span>

                            <button
                                onClick={(e) => chat.handleDeleteChat(c._id, e)}
                                className="text-xs px-2 py-1 hover:text-red-500 cursor-pointer"
                                title="Delete chat"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* User Profile Footer */}
                <div className={`p-4 border-t-4 font-bold transition-colors duration-200 ${styles.footerBg}`}>
                    {user ? `User: ${user.username}` : "Loading user..."}
                </div>
            </div>

            {/* MAIN CHAT WINDOW */}
            <div className="flex-1 flex flex-col relative">

                {/* Theme Toggle Button */}
                <button
                    onClick={chat.toggleTheme}
                    className={`absolute top-5 right-10 rounded-full p-3 border-2 font-bold flex items-center gap-2 z-50 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all ${styles.toggleBtn}`}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}

                    <span className="text-xs uppercase">
                        {isDark ? "Light" : "Dark"}
                    </span>
                </button>

                {/* Messages Area */}
                <div className="messages flex-1 overflow-y-auto py-20 px-6 space-y-4">

                    {(!messages || messages.length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <h1 className="text-4xl font-black mb-2">
                                What's on your mind?
                            </h1>

                            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} font-mono`}>
                                Start a conversation below.
                            </p>
                        </div>
                    ) : (
                        // FIXED: Removed unnecessary curly braces here
                        Array.isArray(messages) && messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-4 border-3 max-w-xl transition-colors duration-200 ${
                                    msg.role === "user"
                                        ? `ml-auto ${styles.userBubble}`
                                        : `mr-auto ${styles.aiBubble}`
                                }`}
                            >
                                <span className={`block text-xs font-bold uppercase font-mono mb-1 ${
                                    isDark ? "text-gray-400" : "text-gray-500"
                                }`}>
                                    {msg.role}
                                </span>

                                {/* Markdown Content */}
                                <div className="space-y-2 leading-relaxed break-words">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ children }) => (
                                                <p className="whitespace-pre-wrap mb-2 last:mb-0">
                                                    {children}
                                                </p>
                                            ),

                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-black mt-3 mb-1">
                                                    {children}
                                                </h1>
                                            ),

                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-extrabold mt-3 mb-1">
                                                    {children}
                                                </h2>
                                            ),

                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-bold mt-2 mb-1">
                                                    {children}
                                                </h3>
                                            ),

                                            ul: ({ children }) => (
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {children}
                                                </ul>
                                            ),

                                            ol: ({ children }) => (
                                                <ol className="list-decimal pl-5 space-y-1">
                                                    {children}
                                                </ol>
                                            ),

                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline font-bold text-[#FF5722] hover:opacity-80"
                                                >
                                                    {children}
                                                </a>
                                            ),

                                            code: ({ inline, children }) =>
                                                inline ? (
                                                    <code className={`px-1.5 py-0.5 rounded font-mono text-sm border ${
                                                        isDark
                                                            ? "bg-[#2A2A2A] text-[#FFCC00] border-[#F4F1EA]"
                                                            : "bg-gray-100 text-[#1A1A1A] border-[#1A1A1A]"
                                                    }`}>
                                                        {children}
                                                    </code>
                                                ) : (
                                                    <pre className={`p-3 my-2 overflow-x-auto font-mono text-sm border-2 ${
                                                        isDark
                                                            ? "bg-[#121212] text-[#F4F1EA] border-[#F4F1EA]"
                                                            : "bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]"
                                                    }`}>
                                                        <code>{children}</code>
                                                    </pre>
                                                ),

                                            table: ({ children }) => (
                                                <div className="overflow-x-auto my-2">
                                                    <table className={`w-full border-collapse border-2 text-sm ${
                                                        isDark
                                                            ? "border-[#F4F1EA]"
                                                            : "border-[#1A1A1A]"
                                                    }`}>
                                                        {children}
                                                    </table>
                                                </div>
                                            ),

                                            th: ({ children }) => (
                                                <th className={`border-2 p-2 text-left font-bold ${
                                                    isDark
                                                        ? "border-[#F4F1EA] bg-[#2A2A2A]"
                                                        : "border-[#1A1A1A] bg-gray-100"
                                                }`}>
                                                    {children}
                                                </th>
                                            ),

                                            td: ({ children }) => (
                                                <td className={`border-2 p-2 ${
                                                    isDark
                                                        ? "border-[#F4F1EA]"
                                                        : "border-[#1A1A1A]"
                                                }`}>
                                                    {children}
                                                </td>
                                            )
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="font-mono text-sm animate-pulse">
                            AI is thinking...
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <form
                    onSubmit={handleSubmit}
                    className={`p-4 border-t-4 flex gap-2 transition-colors duration-200 ${styles.formBg}`}
                >
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={`flex-1 p-3 border-3 font-mono focus:outline-none transition-colors duration-200 ${styles.inputField}`}
                    />

                    <button
                        type="submit"
                        className={`px-6 font-bold border-3 active:translate-x-1 active:translate-y-1 cursor-pointer transition-all ${styles.sendBtn}`}
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
