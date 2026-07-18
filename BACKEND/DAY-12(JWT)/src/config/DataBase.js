let mongoose = require("mongoose");
async function connectToDB(){
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("connected to DB");
        
    }catch(err){
        console.log(err.message);
        
    }
} 
module.exports = connectToDB;