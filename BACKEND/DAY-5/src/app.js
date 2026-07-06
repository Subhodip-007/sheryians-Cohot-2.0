const express = require('express');
  const app = express();
  module.exports = app;
  const data=[];

 app.use(express.json())
  app.post('/notes',(req,res)=>{
    data.push(req.body);
    res.status(201).json({massnge : "notes created successfuly" })
    res.send('notes added !'); // insted of res,send the actual way to sent res is
 res.status(201).json({massnge : "notes created successfully" })
   })
  app.get('/notes',(req,res)=>{
    res.send(data)
  })

app.delete("/notes/:index",(req,res)=>{
    delete data[req.params.index]
    res.status(204).json({
        massnge : "notes deleted successfully"
    })
})
app.patch('/notes/:index',(req,res)=>{
    data[req.params.index].description = req.body.description;
    res.status(200).json({
        massnge : "notes update successfully"
    })
})