import { app } from "./src/app.js";
import dotenv from "dotenv/config";
import { connectToDB } from "./src/config/Database.js";
import { testAI } from "./src/services/ai.service.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app)
initSocket(httpServer)
testAI()
connectToDB();
httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})