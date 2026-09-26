import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY,
});
//  testing 
export const testAI = async () => {
  try {
    const resp = await model.invoke("hello ai!");

    console.log(resp.content);
  } catch (err) {
    console.log(err);
  }
};