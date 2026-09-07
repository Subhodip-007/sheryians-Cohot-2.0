import { connect } from "mongoose"
import  dotenv  from "dotenv"
dotenv.config()
export const connectToDb = async()=>{
 try{
  await connect(process.env.MONGO_URI)
  console.log("connected to DB....");
  
 }catch(err){
    console.log("failed to connect DB.....");
    console.log(err.message);
 }
}