const express = require('express');
const dataModel = require("./model/data.model");
const cors= require('cors')
const path= require('path')
const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public", "dist")));
app.use(cors());
// POST
app.post("/api/home",async (req,res)=>{
    let {Title,Description}=req.body;
   let data = await dataModel.create({
        Title ,Description
    })
    res.status(200).json({
        message:"data created successful",
        data
    })
    
})
// GET
app.get('/api/home',async (req,res)=>{
    let fetcheddata = await dataModel.find()
    res.status(200).json({
        message:"data successful fetched",
        fetcheddata
    })
})
// delete 
app.delete('/api/home/:id',async(req,res)=>{
    try{
    const id = req.params.id;
   const deletedData = await dataModel.findByIdAndDelete(id);
           if (!deletedData) {
            return res.status(404).json({
                message: "Data not found"
            });
        }

        res.status(200).json({
            message: `Deletion successful. ID: ${id}`,
            deletedData
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
})
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "dist", "index.html"));
});
module.exports = app;