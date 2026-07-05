const express = require('express');
const app =  express();// yaha pe create hua bss
// start krr neke liya alag file 

module.exports = app;
 const data=[];
 app.use(express.json())
 // create
app.post('/',(req,res)=>{
    data.push(req.body);
    res.send("note created")
})
// read/get
app.get('/',(req,res)=>{
    res.send(data)
})
// delete
//  we will use request. params
// communication through url  req.body for large and req.parem  for small
app.delete('/:index',(req,res)=>{
    delete data[req.params.index];    // why r we not using splice 
    res.send("notes deleted")          // bcz there is nothing called delete in backend it is just replaced with null(garbage cullector)
})
 
app.patch('/:index',(req,res)=>{
    // req.body={title, decs}
    data[req.params.index].description = req.body.description
      res.send("notes updated !")
    })
    

    // now a big problem that is if server by chance restart then data is gon
    // which is database........................
