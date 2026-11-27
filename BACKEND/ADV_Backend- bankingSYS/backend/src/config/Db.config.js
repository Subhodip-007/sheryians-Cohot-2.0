import mongoose from "mongoose"
import { config } from "./config.js";
import logger from "../utils/logger.js";

export const connectToDb = async ()=>{
    try{
        await mongoose.connect(config.MONGO_URI)
        logger.success("connected to DB......")

    }catch(err){
        logger.error(err.message)
    }
}