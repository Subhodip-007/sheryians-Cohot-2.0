require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const logger = require("./src/utils/logger");
connectToDB();
app.listen(process.env.PORT,()=>{
    logger.info(`server started... at PORT:${process.env.PORT}`)
    
})