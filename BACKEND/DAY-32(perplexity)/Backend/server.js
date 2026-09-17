import { app } from "./src/app";
import dotenv from "dotenv/config";
import { connectToDB } from "./src/config/Database";
dotenv.config();
connectToDB();
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})