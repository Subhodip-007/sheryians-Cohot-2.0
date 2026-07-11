const express = require('express');
const notemodel = require('./models/notes.model')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
//  POST 
app.post("/", async (req,res)=>{
    const {title,description} = req.body;
  const note = await notemodel.create({
        title , description
    })
    res.status(201).json({
        massage: "note created",
        note
    })


})
// GET
app.get("/",async (req,res)=>{
  let fetchnotes = await notemodel.find();
  res.status(200).json({
    message:"Data fetched successfully",
    fetchnotes
  })
})
// DELETE
app.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    await notemodel.findByIdAndDelete(id)
    console.log(id);
    res.status(200).json({
        message:"delete sucessful !",
        id
    })
    
})
// UPDATE 
app.patch("/:id",async (req,res)=>{
    const id =req.params.id;
    const {description} = req.body;
    await notemodel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message:"update sucessful !",
        id
    })
})

module.exports = app;