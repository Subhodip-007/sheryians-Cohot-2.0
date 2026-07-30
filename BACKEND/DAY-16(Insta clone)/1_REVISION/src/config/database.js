const { default: mongoose } = require("mongoose");

const connectToDB = async()=>{
   try{
     await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("CONNECTED TO DB ....");
   }catch(err){
    console.log(err.message);
    
   }
    
}
module.exports = connectToDB;