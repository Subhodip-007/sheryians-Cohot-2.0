import { app } from "./src/app.js";
import { connectToDB } from "./src/config/DataBase.js";
connectToDB()
app.listen(3000,()=>{
    console.log("server is running at port 3000");
    
})