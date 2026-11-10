import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";

const MistralModelForTitle = new ChatMistralAI({
  model: "ministral-3b-latest",
  temperature: 0,
  apiKey: process.env.MISTRAL_API_KEY,
  maxRetries: 0,
});

const GeminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite", 
  apiKey: process.env.GEMINI_API_KEY,
  maxRetries: 0,
});
//  testing 
// export const testAI = async () => {
//   try {
//     const resp = await GeminiGeminiModel.invoke("hello ai!");

//     console.log(resp.content);
//   } catch (err) {
//     console.log(err);
//   }
// };
export async function generateResponse(message) {
  try {
    // 1. Add 'await' so the function waits for the API call to finish
    const response = await GeminiModel.invoke(
      message.map((msg)=>{
        if(msg.role == "user") return new HumanMessage(msg.content)
          else if(msg.role == "ai") return new AIMessage(msg.content)
      })
    );
    // 2. Return 'response.content' to get the actual text string
    return response.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
// ok now for generation title we will not use gemini bcz its a big GeminiModel insted we will use mistral

export async function generateChatTitle(message) {
  try {
    const response = await MistralModelForTitle.invoke([
      new SystemMessage(
        "You are a helpful assistant that generates short, concise chat titles. Summarize the user's message into a 3 to 5 word title. Return only the title text with no quotes, punctuation, or extra explanation."
      ),
      new HumanMessage(message),
    ]);

    return response.content.trim();
  } catch (error) {
    console.error("Error generating chat title:", error);
    // Return a fallback string instead of the error object
    return message.slice(0, 30).trim() || "New Chat";
  }
}