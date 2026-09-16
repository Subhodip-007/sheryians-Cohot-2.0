import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => { // server prr ek naya connection banega 
  console.log("new connection created.. ");
  socket.on("message",(msg)=>{
    console.log("user fired msg evennt");
    console.log(msg);
    // message created by user1
    io.emit("abc") // event fire this msg to every user who is listening to abc
    
    
  })
  
});
httpServer.listen(3000,()=>{ // app .listen will not work because we are using socket.io so
  // actual module is httpServer raw 
  // in express to  start server we use app.listen
  // but socket.io is a completetely different thing and dont work with express so we have to use httpServer.listen
// we have to use httpServer.listen
    console.log("server is running....");
    
})