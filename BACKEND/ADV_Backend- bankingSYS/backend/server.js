import { app } from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectToDb } from "./src/config/Db.config.js";
import  logger  from "./src/utils/logger.js"
connectToDb()
app.listen(config.PORT,()=>{
 logger.info("server is running....",config.PORT)
})