
import { chatModel } from "../model/chat.model.js";
import { messageModel } from "../model/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js";

export const sendMessageController = async (req,res)=>{
    try{
        const{message,chat:chatid} = req.body;
        console.log(message);
        let ChatTitle = null
        let chat = null
        if(!chatid){   
         ChatTitle = await generateChatTitle(message)
         chat = await chatModel.create({
            user: req.user.id,
            title:ChatTitle
        })
        }
               const userMessage = await messageModel.create({
            chat: chatid || chat._id,
            content:message,
            role:"user"
        })
        const allMessage =  await messageModel.find({chat: chatid || chat._id})
         const result =  await generateResponse(allMessage)
        const aiMessage = await messageModel.create({
            chat: chatid || chat._id,
            content:result,
            role:"ai"
        })
        res.json({
           title:ChatTitle,
           chat,
           aiMessage,
           userMessage,
           allMessage
        })
    }catch(err){
        console.error("Error in sendMessageController:", err);
    return res.status(500).json({
      message: "Failed to process message",
      error: err.message,
    });
  
    }
        
}
export const getChats = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const chats = await chatModel.find({ user: req.user.id });

    return res.status(200).json({
      chats,
    });
  } catch (err) {
    console.error("Error in getChats:", err);
    return res.status(500).json({
      message: "Failed to fetch chats",
      error: err.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // 1. Ensure user is authenticated
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // 2. Check if the chat exists in the database
    const chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat does not exist" });
    }

    // 4. Check if the chat belongs to the logged-in user
    if (chat.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to access this chat",
      });
    }

    // 5. Fetch messages for the verified chat
    const messages = await messageModel.find({ chat: chatId });

    return res.status(200).json({
      messages,
    });
  } catch (err) {
    console.error("Error in getMessages:", err);
    return res.status(500).json({
      message: "Failed to fetch messages",
      error: err.message,
    });
  }
};


export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    // 1. Ensure user is authenticated
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // 3. Check if the chat exists
    const chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat does not exist" });
    }

    // 4. Verify the chat belongs to the logged-in user
    if (chat.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to delete this chat",
      });
    }
    // 5. Delete all associated messages and the chat itself
    await Promise.all([
      messageModel.deleteMany({ chat: chatId }),
      chatModel.findByIdAndDelete(chatId),
    ]);

    return res.status(200).json({
      message: "Chat deleted successfully",
      chatId,
    });
  } catch (err) {
    console.error("Error in deleteChat:", err);
    return res.status(500).json({
      message: "Failed to delete chat",
      error: err.message,
    });
  }
};
// right now every time  i send a message req a new chat with title is created of if i want to have folowup in same chat
/// now lets built a feature in which we type comething in input and ai decide the chat title by itself
// now to continue in same chat
//{
// message:""
// chatid:""
//}
