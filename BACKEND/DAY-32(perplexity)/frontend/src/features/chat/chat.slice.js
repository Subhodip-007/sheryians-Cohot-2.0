// now is redux how we will store chats is 
// by obj NOT ARRAY 
// how 
// chat = {
//     "title":[
//         {
//             role:user,
//             content:"..."
//         },
//         {
//             role:"ai",
//             contentL:"...."
//         }
//     ]
// }
// key(title) : {
// messages:[array(of messages)],
// id:"...",
// timestamp:"...",
//}

// import { createSlice } from "@reduxjs/toolkit";

// const chatSlice = createSlice({
//     name:'chat',
//     initialState:{
//         chats:{},
//         currentChatId:null,
//         isLoading:false,
//         error:null,
//     },
//     reducers:{
//         createNewChat:(start,action)=>{
//             const {chatId , title } = action.payload
//             start.chats[chatId] = {
//                 id:chatId,
//                 title,
//                 message:[],
//                 lastUpdated: new Date().toISOString()
//             }
//         },
//         addNewMessages:(state,action) =>{
//             const {chatId,content,role} = action.payload
//             state.chats[chatId].message.push({content , role})
//         },
//         setChat:(state,action)=>{
//             state.chats = action.payload
//         },
//         setCurrentChatId:(state,action)=>{
//             state.currentChatId = action.payload
//         },
//         setLoading:(state,action)=>{
//             state.isLoading = action.payload
//         },
//          setError:(state,action)=>{
//             state.error = action.payload
//         }
//     }
// })

// export const {addNewMessages,createNewChat,setChat , setCurrentChatId , setLoading , setError} = chatSlice.actions
// export default chatSlice.reducer



// import { createSlice } from "@reduxjs/toolkit";

// const chatSlice = createSlice({
//     name: 'chat',
//     initialState: {
//         chats: {},
//         currentChatId: null,
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         setChatData: (state, action) => {
//             const { chatId, title, messages } = action.payload;
//             if (!state.chats[chatId]) {
//                 state.chats[chatId] = {
//                     id: chatId,
//                     title: title || "New Chat",
//                     message: messages || [],
//                 };
//             } else {
//                 if (title) state.chats[chatId].title = title;
//                 if (messages) state.chats[chatId].message = messages;
//             }
//         },
//         setChatsMap: (state, action) => {
//             state.chats = action.payload;
//         },
//         setCurrentChatId: (state, action) => {
//             state.currentChatId = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.isLoading = action.payload;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//         }
//     }
// });

// export const { setChatData, setChatsMap, setCurrentChatId, setLoading, setError } = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],           // Sidebar list: [{ _id, title }, ...]
        messages: [],        // Active chat window messages: [{ role, content }, ...]
        currentChatId: null, // Tracks active chat
        isLoading: false,
        error: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        deleteChat: (state, action) => {
        const deletedChatId = action.payload;
        // Filter out the deleted chat from the array
        state.chats = state.chats.filter(chat => chat._id !== deletedChatId);
        
        // If the user was currently viewing the deleted chat, clear the active window
        if (state.currentChatId === deletedChatId) {
            state.currentChatId = null;
            state.messages = [];
        }
    },
    }
});

export const { setChats, setMessages, addMessage, setCurrentChatId, setLoading, setError,deleteChat } = chatSlice.actions;
export default chatSlice.reducer;