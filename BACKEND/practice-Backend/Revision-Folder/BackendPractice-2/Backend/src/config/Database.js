import mongoose from "mongoose";
import { logger } from "../services/logger.service.js";

export async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("connented to DB...")
    }catch(err){
        logger.error(err.message)
    }
}
