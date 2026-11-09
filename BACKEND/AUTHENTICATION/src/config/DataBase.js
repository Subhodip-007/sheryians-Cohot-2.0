
import mongoose from "mongoose";
import config from "./config.js";

 export const connectToDB = async ()=>{
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("connected to DB.....");
        
    }catch(err){
        console.log(err);
        
    }
 }