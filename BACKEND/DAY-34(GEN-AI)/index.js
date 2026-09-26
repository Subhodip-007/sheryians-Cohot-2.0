import "dotenv/config";
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "langchain"
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
//  rl.question("what is your name ?",(name)=>{
//     console.log(`hello ${name}`);
//     rl.close()
    
//  }) for testing 
// now we will instrall package langchain


const model = new ChatMistralAI({
    model: "pixtral-12b-latest",
    temperature:  0.7
});
//     console.log(
//     process.env.MISTRAL_API_KEY
//         ? "MISTRAL_API_KEY loaded"
//         : "MISTRAL_API_KEY missing"
// );
// try {
//     const res = await model.invoke("hello ai");

// console.log("AI Response:", res.content);
// } catch (error) {
//     console.log("Mistral API Error:");

//     if (error.statusCode === 429) {
//         console.log("Rate limit exceeded. Check Mistral workspace limits/usage.");
//     } else {
//         console.error(error);
//     }
// }
const messages = [] // but this is not scalable mathod 

while(true){ // but if u ask ai for any provisus msg then it csnt reply bcz it dont have access to previous msg
    // bcz we r directly accessing ASP (state less)
    const userInput = await rl.question("you: " );
    messages.push(new HumanMessage(userInput))
    const resp = await model.invoke(messages);
    messages.push(resp)
    console.log(resp.content);
    

}
rl.close()
