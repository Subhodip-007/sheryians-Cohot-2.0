import "dotenv/config"
import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
  model: "pixtral-12b-latest", 
  temperature: 0
});

try{
   const resp =  await model.invoke("hello")
   console.log(resp);
   
}catch(err){

}