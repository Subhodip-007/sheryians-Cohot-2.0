import "dotenv/config"
import app from "./src/app.js";
import { logger } from "./src/services/logger.service.js";
import { connectToDB } from "./src/config/Database.js";
connectToDB();
app.listen(process.env.PORT,()=>{
    logger.info("server is running....")
})