import app from "./src/app.js";
import "dotenv/config";
import connectToDb from "./src/config/Database.js";
connectToDb();
app.listen(process.env.PORT,()=>{
    console.log(`server is running  on ${process.env.PORT}`);
    
})