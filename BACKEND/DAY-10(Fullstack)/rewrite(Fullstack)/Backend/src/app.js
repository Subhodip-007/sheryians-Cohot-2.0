const express = require('express');
const dataModel = require ('./model/Data.model')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
app.post('/api/home',async (req,res)=>{
    try{
        let {title,description} = req.body;
    let data = await dataModel.create({
        title:title,
        description:description
    })
    res.status(200).json({
        message:"data creation successfull",
        data

    })
    }catch(err){
        console.log(err);
        
    }
})
 app.get('/api/home',async (req,res)=>{
    try{
         let fetcheddata = await dataModel.find()
         res.status(200).json({
            message:'fetch successfull',
            fetcheddata

         })
    }catch (err) {
    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
}
   

 })
 app.delete("/api/home:id",async (req,res)=>{
    try{
          let id = req.params.id;
   let DeletedData = await dataModel.findByIdAndDelete(id)
       res.status(200).json({
        message:"deletion successful",
        DeletedData
    })
    }catch(err){
        res.status(500).json({
            message:"Data not found",
            id
        })
    }
 })
 app.patch("/api/home:id",async(req,res)=>{
    const id = req.params.id;
    try{
        let {title,description}=req.body;
    let updateddata = await dataModel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        message:"update dets successfully",
        updateddata

    })
    }catch(err){
        res.status(500).json({
            message:"update failed !" ,
            id,
            error: err.message
        })
    }
 })
module.exports = app; 