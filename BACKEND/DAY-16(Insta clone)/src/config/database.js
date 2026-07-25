const mongoose = require("mongoose");
const logger = require("../utils/logger");
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("connected to DB....")
    } catch (err) {
        logger.error("cannot connect to DB", err.message);
    }
}
module.exports = connectToDB;