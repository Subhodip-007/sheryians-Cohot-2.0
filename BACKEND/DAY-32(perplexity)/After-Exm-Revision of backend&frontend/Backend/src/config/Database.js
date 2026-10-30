import mongoose from "mongoose"
const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to Database");
        
        
    }catch(err){
      console.error(err)
    }
}
export default connectToDb