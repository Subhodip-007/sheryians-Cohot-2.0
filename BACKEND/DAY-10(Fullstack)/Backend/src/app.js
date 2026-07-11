const express = require('express');
const dataModel = require("./model/data.model");
const app = express();
app.use(express.json())
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
app.get('/api/home',async (req,res)=>{
    let fetcheddata = await dataModel.find()
    res.status(200).json({
        message:"data successful fetched",
        fetcheddata
    })
})
module.exports = app;