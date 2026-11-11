import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { MessageSquare, Plus, Send, Settings, ArrowUpRight, Sparkles, User, Bot, Terminal, Code2, Cpu } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Dashboard = () => {
    const chat = useChat();
    const { user } = useSelector((state) => state.auth);
    const chatsMap = useSelector((state) => state.chat.chats || {});
    const currentChatId = useSelector((state) => state.chat.currentChatId);

    const [messageInput, setMessageInput] = useState("");
    const messagesEndRef = useRef(null); // Reference for auto-scrolling

    const chatsList = Object.values(chatsMap);

    const activeChat = currentChatId ? chatsMap[currentChatId] : null;
    const messages = activeChat?.message || [];
    const isNewChat = messages.length === 0;

    // Auto-scroll to bottom whenever messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch chat history and initialize socket on mount
    useEffect(() => {
        if (chat?.initializeSocketConnection) {
            chat.initializeSocketConnection();
        }
        if (chat?.fetchAllChats) {
            chat.fetchAllChats();
        }
    }, []);

    const handleSendMessage = async (textToSend) => {
        const text = textToSend || messageInput;
        if (!text.trim()) return;
        
        setMessageInput("");
        await chat.sendMessage({ message: text, chatId: currentChatId });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        handleSendMessage(messageInput);
    };

    return (
        <div className="flex h-screen bg-gray-200 font-mono text-black overflow-hidden">
            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r-4 border-black flex flex-col shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] z-10">
                {/* Brand Header */}
                <div className="p-4 border-b-4 border-black bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-extrabold tracking-tighter uppercase flex items-center gap-2">
                            <Sparkles className="w-5 h-5 fill-black" />
                        </h1>
                        <span className="text-xs font-bold border-2 border-black px-1.5 py-0.5 bg-yellow-300">
                            V1.0
                        </span>
                    </div>
                    {/* New Chat Button */}
                    <button 
                        onClick={() => chat.startNewChat()}
                        className="w-full flex items-center justify-between bg-black text-white px-4 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase text-sm cursor-pointer"
                    >
                        <span>01 / New Chat</span>
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {/* Chat History List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:black_transparent] [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black">
                    <p className="text-xs font-black uppercase text-gray-500 mb-2">// Active Sessions</p>
                    
                    {chatsList.length > 0 ? (
                        chatsList.map((c, idx) => {
                            const chatId = c.id || c._id;
                            const isActive = chatId === currentChatId;
                            return (
                                <button 
                                    key={chatId || idx} 
                                    onClick={() => chat.selectChat(chatId)}
                                    className={`w-full text-left p-3 border-2 border-black font-bold text-xs uppercase flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer ${isActive ? 'bg-yellow-300' : 'bg-white hover:bg-gray-100'}`}
                                >
                                    <span className="truncate flex items-center gap-2 text-black">
                                        <MessageSquare className="w-4 h-4 shrink-0" /> {c.title || `Session ${idx + 1}`}
                                    </span>
                                    {isActive && <ArrowUpRight className="w-4 h-4 shrink-0" />}
                                </button>
                            );
                        })
                    ) : (
                        <div className="p-3 border-2 border-dashed border-black text-center text-xs font-bold text-gray-500 uppercase">
                            No Active Chats Found
                        </div>
                    )}
                </div>

                {/* User Profile Footer */}
                <div className="p-4 border-t-4 border-black bg-white flex items-center justify-between text-xs font-bold uppercase">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 border-2 border-black bg-gray-300 flex items-center justify-center font-black shrink-0">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                            <p className="leading-none truncate">{user?.username || "GUEST_USER"}</p>
                            <span className="text-[10px] text-gray-500">{user ? "AUTHENTICATED" : "OFFLINE"}</span>
                        </div>
                    </div>
                    <button className="p-2 border-2 border-black hover:bg-gray-200 cursor-pointer">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </aside>

            {/* MAIN CHAT AREA */}
            <main className="flex-1 flex flex-col bg-gray-100 relative">
                {/* Top Header */}
                <header className="h-16 border-b-4 border-black bg-white flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-widest bg-black text-white px-2 py-1">
                            WELCOME, {user?.username ? user.username.toUpperCase() : "OPERATOR"}
                        </span>
                    </div>
                </header>

                {/* Content Area: Empty State vs Message Stream */}
                {isNewChat ? (
                    <div className="flex-1 overflow-y-auto p-6 pb-36 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                        <div className="w-full border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center mb-8">
                            <div className="w-12 h-12 bg-yellow-300 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Terminal className="w-6 h-6 text-black" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">SYSTEM READY, {user?.username ? user.username.toUpperCase() : "OPERATOR"}</h2>
                            <p className="text-xs font-bold text-gray-600 uppercase max-w-md mx-auto">
                                Initialize a prompt query below or select a preset diagnostic module to begin processing.
                            </p>
                        </div>

                        {/* Suggestion Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {[
                                { title: "Architecture Spec", desc: "Break down core design principles of Tactile Brutalism", icon: Cpu },
                                { title: "Pipeline Optimization", desc: "Inspect async execution patterns & bottlenecks", icon: Code2 },
                                { title: "System Diagnostics", desc: "Run status check on node cluster & socket pipelines", icon: Sparkles }
                            ].map((item, i) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(item.desc)}
                                        className="text-left border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-8 h-8 border-2 border-black bg-yellow-300 flex items-center justify-center mb-3">
                                                <IconComponent className="w-4 h-4 text-black" />
                                            </div>
                                            <h3 className="font-black text-xs uppercase mb-1">{item.title}</h3>
                                            <p className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed">{item.desc}</p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-1 text-[10px] font-black uppercase text-black">
                                            <span>// EXECUTE</span> <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    /* Messages Container */
                    <div className="flex-1 overflow-y-auto p-6 pb-36 space-y-6 [scrollbar-width:thin] [scrollbar-color:black_transparent] [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black">
                        {messages.map((msg, index) => {
                            const isUser = msg.role === "user";
                            return (
                                <div 
                                    key={index} 
                                    className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-10 h-10 border-2 border-black flex items-center justify-center shrink-0 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isUser ? 'bg-yellow-300 text-black' : 'bg-black text-white'}`}>
                                            {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                        </div>
                                        <div className={`border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isUser ? 'bg-yellow-300 text-black' : 'bg-white text-black'}`}>
                                            <div className="text-xs font-black uppercase text-gray-500 mb-1">
                                                {isUser ? `0${index + 1} / USER_INPUT` : `0${index + 1} / GEMINI_RESPONSE`}
                                            </div>
                                            
                                            {isUser ? (
                                                <p className="font-bold text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                            ) : (
                                                <div className="text-sm leading-relaxed prose prose-sm max-w-none font-mono">
                                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Invisible scroll anchor */}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* FLOATING OVERLAY INPUT AREA */}
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-20">
                    <form 
                        onSubmit={handleFormSubmit} 
                        className="max-w-4xl mx-auto border-4 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] pointer-events-auto"
                    >
                        <textarea
                            rows={2}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(messageInput);
                                }
                            }}
                            placeholder="TYPE YOUR MESSAGE HERE..."
                            className="w-full resize-none p-2 font-bold uppercase text-sm focus:outline-none placeholder-gray-400"
                        />
                        <div className="flex justify-between items-center pt-2 border-t-2 border-black px-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">Press ENTER to send</span>
                            <button 
                                type="submit" 
                                className="bg-black text-white px-5 py-2 font-black text-xs uppercase border-2 border-black flex items-center gap-2 hover:bg-yellow-300 hover:text-black transition-colors cursor-pointer"
                            >
                                SEND <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;