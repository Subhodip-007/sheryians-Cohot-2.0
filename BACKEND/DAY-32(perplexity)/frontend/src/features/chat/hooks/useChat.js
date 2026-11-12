
// import { useDispatch } from "react-redux";
// import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
// import { initializeSocketConnection } from "../service/chat.socket";
// import { setChatData, setChatsMap, setCurrentChatId, setError, setLoading } from "../chat.slice";

// export const useChat = () => {
//     const dispatch = useDispatch();

//     const fetchAllChats = async () => {
//         try {
//             dispatch(setLoading(true));
//             const data = await getChats();
//             if (data?.chats) {
//                 const chatsMap = data.chats.reduce((acc, chat) => {
//                     acc[chat._id] = {
//                         id: chat._id,
//                         title: chat.title,
//                         message: [] 
//                     };
//                     return acc;
//                 }, {});
//                 dispatch(setChatsMap(chatsMap));
//             }
//             dispatch(setLoading(false));
//         } catch (err) {
//             dispatch(setError(err.message));
//             dispatch(setLoading(false));
//         }
//     };

//     const selectChat = async (chatId) => {
//         try {
//             dispatch(setLoading(true));
//             dispatch(setCurrentChatId(chatId));
//             const data = await getMessages(chatId);
            
//             if (data?.messages) {
//                 const formattedMessages = data.messages.map(m => ({
//                     role: m.role,
//                     content: m.content
//                 }));
                
//                 dispatch(setChatData({
//                     chatId,
//                     messages: formattedMessages
//                 }));
//             }
//             dispatch(setLoading(false));
//         } catch (err) {
//             dispatch(setError(err.message));
//             dispatch(setLoading(false));
//         }
//     };

//     const startNewChat = () => {
//         dispatch(setCurrentChatId(null));
//     };

//     const handleSendMessage = async ({ message, chatId, getStateChats, currentMessages }) => {
//         try {
//             dispatch(setLoading(true));
            
//             // 1. OPTIMISTIC UPDATE: Instantly show user message locally
//             const tempChatId = chatId || "temp-" + Date.now();
//             if (!chatId) {
//                 dispatch(setCurrentChatId(tempChatId));
//             }
            
//             const optimisticMessages = [
//                 ...(currentMessages || []),
//                 { role: "user", content: message }
//             ];

//             dispatch(setChatData({
//                 chatId: tempChatId,
//                 title: message.slice(0, 20) + "...",
//                 messages: optimisticMessages
//             }));

//             // 2. Perform API Call
//             const data = await sendMessage({ message, chatId });
            
//             const { chat, allMessage, aiMessage, title } = data;
//             const realChatId = chat?._id || chatId;
//             const activeTitle = chat?.title || title || "Chat Session";

//             // Ensure AI message is included
//             let finalMessages = [...(allMessage || [])];
//             if (aiMessage && !finalMessages.some(m => m.content === aiMessage.content && m.role === "ai")) {
//                 finalMessages.push(aiMessage);
//             }

//             const formattedMessages = finalMessages.map(m => ({
//                 role: m.role,
//                 content: m.content
//             }));

//             // Clean up temp chat if it was a brand-new session and replace with real DB ID
//             if (!chatId && tempChatId !== realChatId) {
//                 // If your slice needs to transition IDs, ensure realChatId takes over
//             }

//             dispatch(setChatData({
//                 chatId: realChatId,
//                 title: activeTitle,
//                 messages: formattedMessages
//             }));

//             dispatch(setCurrentChatId(realChatId));
//             dispatch(setLoading(false));
//             return data;
//         } catch (err) {
//             dispatch(setError(err.message));
//             dispatch(setLoading(false));
//         }
//     };

//     return {
//         initializeSocketConnection,
//         fetchAllChats,
//         selectChat,
//         startNewChat,
//         sendMessage: handleSendMessage,
//         deleteChat
//     };
// };


import { useDispatch } from "react-redux";
 import { deleteChat as deleteChatApi, getChats, getMessages, sendMessage,} from "../service/chat.api";
import {initializeSocketConnection} from "../service/chat.socket"
 import { setCurrentChatId , setError , setLoading,setMessages, setChats, deleteChat} from "../chat.slice"
export const useChat = ()=>{
   const dispatch = useDispatch();
    const fetchAllChats = async () => {
        try{
            dispatch(setLoading(true));
            const data  = await getChats();
            if(data?.chats){
                dispatch(setChats(data.chats))
            }
            dispatch(setLoading(false));

        }catch(err){
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    }
    const getMessageOfChat = async (chatId) =>{
        try{
                dispatch(setLoading(true));
                dispatch(setCurrentChatId(chatId));
                const data = await getMessages(chatId);
                if (data?.messages) {
                dispatch(setMessages(data.messages)); 
            }
            dispatch(setLoading(false));
        }catch(err){
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    }
    const startNewChat = () => {
        dispatch(setCurrentChatId(null));
        dispatch(setMessages([])); // Clear active message window
    };
    const handleSendMessage = async ({ message, chatId, currentMessages }) => {
        try {
            dispatch(setLoading(true));

            // Optimistic update: instantly push user message to screen
            const tempChatId = chatId || null;
            dispatch(setMessages({ role: "user", content: message }));

            // Call backend API
            const data = await sendMessage({ message, chatId });
            
            const { chat, allMessage, aiMessage } = data;
            const realChatId = chat?._id || chatId;

            // Ensure complete message history with AI response is set
            let finalMessages = [...(allMessage || [])];
            if (aiMessage && !finalMessages.some(m => m.content === aiMessage.content && m.role === "ai")) {
                finalMessages.push(aiMessage);
            }

            dispatch(setMessages(finalMessages));
            dispatch(setCurrentChatId(realChatId));
            
            // Refresh sidebar list to catch any newly generated titles
            fetchAllChats();
            
            dispatch(setLoading(false));
            return data;
        } catch (err) {
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
       
    };
     const handleDeleteChat = async (chatId, e) => {
    // Stop event bubbling so clicking delete doesn't trigger selectChat()
    e.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    try {
        dispatch(setLoading(true));
        await deleteChatApi(chatId); // Calls your api.js delete function
        dispatch(deleteChat(chatId)); // Updates Redux flat array instantly
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
    }
};
 return {
    initializeSocketConnection, // now this is not complete bcz we have to manage socketconnection in state
    fetchAllChats,
        getMessageOfChat,
        startNewChat,
        sendMessage: handleSendMessage,
        handleDeleteChat
    

 }
}