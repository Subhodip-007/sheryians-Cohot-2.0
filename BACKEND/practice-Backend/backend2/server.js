require("dotenv").config()
const app = require("./src/app");
const connecToDB = require("./src/config/DataBase");
const PORT = 3000;
connecToDB()
app.listen(PORT,()=>{
    console.log("server started running......");
    
})