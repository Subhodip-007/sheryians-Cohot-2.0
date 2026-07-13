const mongoose = require("mongoose");
function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB is connected");
    
})
}

module.exports = ConnectToDB;