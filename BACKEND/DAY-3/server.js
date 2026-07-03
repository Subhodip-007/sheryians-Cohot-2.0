const express = require('express');

const app = express();
app.get("/",(req,res)=>{
   res.send("hello world");
    
})
app.get("/about",(req,res)=>{
   res.send("this about page");
    
})
app.listen(3000,()=>{  // app.listen takes another parameter a callback 
    console.log("server is running on port 3000") // confirm the server is running and is ready to accept request 
     

})