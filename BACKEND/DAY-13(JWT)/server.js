
require("dotenv").config()
const connectToDB = require('./src/config/DataBase')
const app = require("./src/app");
connectToDB()
app.listen(3000,()=>{
    console.log("server is running.....");
    
})