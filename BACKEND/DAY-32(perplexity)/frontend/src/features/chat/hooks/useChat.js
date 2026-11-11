// import { useDispatch } from "react-redux";
// import { deleteChat, getChats, getMessages, sendMessage,} from "../service/chat.api";
// import {initializeSocketConnection} from "../service/chat.socket"
// import {setChat , setCurrentChatId , setError , setLoading,createNewChat ,addNewMessages} from "../chat.slice"
// import { title } from "framer-motion/client";
// export const useChat = ()=>{
//    const dispatch = useDispatch();

//    const handleSendMessage = async ({message,chatId})=>{
//       dispatch(setLoading(true))
//       const data = await sendMessage({message , chatId})
//       const {chat , aiMessage} = data;
//       dispatch(createNewChat({
//          chatId : chat._id,
//          title: chat.title,

//       }))
//             dispatch(addNewMessages({
//          chatId:chat._id,
//          content:aiMessage.content,
//          role:aiMessage.role

//       }))
//       dispatch(addNewMessages({
//          chatId:chat._id,
//          content:message,
//          role:"user"

//       }))
//       dispatch(setCurrentChatId(chat._id))

//    }
//  return {
//     initializeSocketConnection, // now this is not complete bcz we have to manage socketconnection in state

//  }
// }
import { useDispatch } from "react-redux";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket";
import { setChatData, setChatsMap, setCurrentChatId, setError, setLoading } from "../chat.slice";

export const useChat = () => {
    const dispatch = useDispatch();

    const fetchAllChats = async () => {
        try {
            dispatch(setLoading(true));
            const data = await getChats();
            if (data?.chats) {
                const chatsMap = data.chats.reduce((acc, chat) => {
                    acc[chat._id] = {
                        id: chat._id,
                        title: chat.title,
                        message: [] 
                    };
                    return acc;
                }, {});
                dispatch(setChatsMap(chatsMap));
            }
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    };

    const selectChat = async (chatId) => {
        try {
            dispatch(setLoading(true));
            dispatch(setCurrentChatId(chatId));
            const data = await getMessages(chatId);
            
            if (data?.messages) {
                const formattedMessages = data.messages.map(m => ({
                    role: m.role,
                    content: m.content
                }));
                
                dispatch(setChatData({
                    chatId,
                    messages: formattedMessages
                }));
            }
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    };

    const startNewChat = () => {
        dispatch(setCurrentChatId(null));
    };

    const handleSendMessage = async ({ message, chatId, getStateChats, currentMessages }) => {
        try {
            dispatch(setLoading(true));
            
            // 1. OPTIMISTIC UPDATE: Instantly show user message locally
            const tempChatId = chatId || "temp-" + Date.now();
            if (!chatId) {
                dispatch(setCurrentChatId(tempChatId));
            }
            
            const optimisticMessages = [
                ...(currentMessages || []),
                { role: "user", content: message }
            ];

            dispatch(setChatData({
                chatId: tempChatId,
                title: message.slice(0, 20) + "...",
                messages: optimisticMessages
            }));

            // 2. Perform API Call
            const data = await sendMessage({ message, chatId });
            
            const { chat, allMessage, aiMessage, title } = data;
            const realChatId = chat?._id || chatId;
            const activeTitle = chat?.title || title || "Chat Session";

            // Ensure AI message is included
            let finalMessages = [...(allMessage || [])];
            if (aiMessage && !finalMessages.some(m => m.content === aiMessage.content && m.role === "ai")) {
                finalMessages.push(aiMessage);
            }

            const formattedMessages = finalMessages.map(m => ({
                role: m.role,
                content: m.content
            }));

            // Clean up temp chat if it was a brand-new session and replace with real DB ID
            if (!chatId && tempChatId !== realChatId) {
                // If your slice needs to transition IDs, ensure realChatId takes over
            }

            dispatch(setChatData({
                chatId: realChatId,
                title: activeTitle,
                messages: formattedMessages
            }));

            dispatch(setCurrentChatId(realChatId));
            dispatch(setLoading(false));
            return data;
        } catch (err) {
            dispatch(setError(err.message));
            dispatch(setLoading(false));
        }
    };

    return {
        initializeSocketConnection,
        fetchAllChats,
        selectChat,
        startNewChat,
        sendMessage: handleSendMessage,
        deleteChat
    };
};