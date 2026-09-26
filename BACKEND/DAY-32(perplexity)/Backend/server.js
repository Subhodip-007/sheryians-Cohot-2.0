import { app } from "./src/app.js";
import dotenv from "dotenv/config";
import { connectToDB } from "./src/config/Database.js";
import { testAI } from "./src/services/ai.service.js";
testAI()
connectToDB();
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})