const express = require('express');
const app = express()
// this will become hardcode 
//  but i want some like a endpoint API where user will send data{
    //     title:"Title 1",
    //     description:" test descp-1"
    // } to server
const data=[

]
app.use(express.json())
// create
app.post("/notes",(req,res)=>{
  
    console.log(req.body)
    data.push(req.body)
      res.send("notes created")
})
// retrive read
app.get('/notes',(req,res)=>{
    res.send(data)
})
app.listen(3000,()=>{
    console.log("servernotes is running on port 3000");
    
})