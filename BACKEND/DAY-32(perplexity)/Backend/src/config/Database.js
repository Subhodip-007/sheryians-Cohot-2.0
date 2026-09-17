import {connect} from "mongoose";

export const connectToDB = async () =>{
    try{
        await connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}