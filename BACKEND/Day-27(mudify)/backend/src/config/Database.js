const {mongoose} = require("mongoose");
const connentToDb = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("connented to DB.....");
       

    }catch(err){
        console.log(err.message);
        

    }

}
module.exports = connentToDb