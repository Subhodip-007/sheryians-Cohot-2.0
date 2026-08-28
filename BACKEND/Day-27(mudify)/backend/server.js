require("dotenv").config();
const app = require("./src/app");
const connentToDb = require("./src/config/Database");
connentToDb()
app.listen(3000,()=>{
    console.log("server is running.......");
    
})