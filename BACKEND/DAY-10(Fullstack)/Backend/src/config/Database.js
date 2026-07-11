const mongoose = require("mongoose");
function ConnectToDB(){
    mongoose.connect('mongodb+srv://subhodip31xd_db_user:myshub2005@cluster0.9qu01r0.mongodb.net/DAY-7')
.then(()=>{
    console.log("DB is connected");
    
})
}

module.exports = ConnectToDB;