require('dotenv').config();
const app = require("./src/app");
const ConnectToDB = require('./src/config/Database')
ConnectToDB();
app.listen(3000,()=>{
    console.log("server is runniong.. at port 3000");
    
})