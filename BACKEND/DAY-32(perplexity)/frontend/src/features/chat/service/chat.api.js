import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

// POST /message (Backend expects { message, chat })
export const sendMessage = async ({ message, chatId }) => {
    try {
        const response = await api.post("/api/chats/message", { message, chat: chatId });
        return response.data;
    } catch (err) {
        return err;
    }
};

// GET /chats
export const getChats = async () => {
    try {
        const response = await api.get("/api/chats/chats");
        return response.data;
    } catch (err) {
        return err;
    }
};

// GET /:chatId/messages
export const getMessages = async (chatId) => {
    try {
        const response = await api.get(`/api/chats/${chatId}/messages`);
        return response.data;
    } catch (err) {
        return err;
    }
};

// DELETE /delete/:chatId
export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`/api/chats/delete/${chatId}`);
        return response.data;
    } catch (err) {
        return err;
    }
};