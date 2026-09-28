import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  AIMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";
import { sendMail } from "./src/services/mail.service.js";
import * as z from "zod" // user for define type format of parameter define datastructure 
const emailTool = tool(
    sendMail,
    {
        name:"emailTool",
        description:"user to send email to dedicated email address",
            schema: z.object({
      to: z
        .string()
        .email()
        .describe("The recipient's email address"),

      subject: z
        .string()
        .min(1)
        .describe("The subject of the email"),

      html: z
        .string()
        .min(1)
        .describe("The email body/message"),
    }),

    }
)
const model = new ChatMistralAI({
  model: "pixtral-12b-latest",
  temperature: 0.7,
});
const agent = createAgent({
  model,
  tools: [emailTool],
});
// const rl = readline.Interface({
//     input:process.stdin,
//     output:process.stdout
// })
// // rl.question("what is your name: ",(name)=>{
// //     console.log(`heool ${name}`);
// //     rl.close()
    
// // }) testing readline 
// const model = new ChatMistralAI({
//     model: "pixtral-12b-latest",
//     temperature:  0.7
// });
// const messages = [] // but this is not scalable mathod 

// while(true){ // but if u ask ai for any provisus msg then it csnt reply bcz it dont have access to previous msg
//     // bcz we r directly accessing ASP (state less)
//     const userInput = await rl.question("you: " );
//     messages.push(new HumanMessage(userInput))
//     const resp = await model.invoke(messages);
//     messages.push(resp)
//     console.log(resp.content);
    

// }

// rl.close()
const rl = readline.createInterface({
  input,
  output,
});


// while (true) {
//   const userInput = await rl.question("You: ");

//   if (
//     userInput.toLowerCase() === "exit" ||
//     userInput.toLowerCase() === "quit"
//   ) {
//     break;
//   }

//   const result = await agent.invoke({
//     messages: [
//       {
//         user: userInput,
//   ai: lastMessage.content,
//   rawResponse: result,
//       },
//     ],
//   });
//   console.log(JSON.stringify(result, null, 2));
//   const lastMessage =
//     result.messages[result.messages.length - 1];

//   console.log("AI:", lastMessage.content);

//   messages.push({
//     user: userInput,
//     ai: lastMessage.content,
//   });
// }

// rl.close();

// console.log(messages);
const messages = [];

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

    if (
        userInput.toLowerCase() === "exit" ||
        userInput.toLowerCase() === "quit"
    ) {
        break;
    }

    messages.push(new HumanMessage(userInput));

    const response = await agent.invoke({
        messages
    });

    const aiMessage =
        response.messages[response.messages.length - 1];

    messages.push(aiMessage);

    console.log("\x1b[34m[AI]\x1b[0m", aiMessage.content);
}

rl.close();