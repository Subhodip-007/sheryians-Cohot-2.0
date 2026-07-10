const express = require("express");
const notesmodel = require("./model/notes.model");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const note = await notesmodel.create(req.body);

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
app.get("/", async (req,res)=>{
    try{
         const fetchnotes = await notesmodel.find()
         res.status(201).json({
      message: "fetch successfully done",
      fetchnotes
      });

    }catch(err){
          res.status(500).json({
      message: err.message
    });  
    }
   
})

module.exports = app;