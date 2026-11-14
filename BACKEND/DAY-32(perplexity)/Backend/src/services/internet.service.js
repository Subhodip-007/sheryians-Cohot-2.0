import { tavily } from "@tavily/core";

export const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async ({ query }) => {
  try {
    const response = await tvly.search(query, {
      maxResults: 5,
      searchDepth: "advanced",
    });

    return response;
  } catch (error) {
    console.error("Tavily Search Error:", error);
    throw error;
  }
};