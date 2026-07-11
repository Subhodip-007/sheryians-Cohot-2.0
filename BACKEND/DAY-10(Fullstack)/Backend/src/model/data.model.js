const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    Title:String,
    Description:String
})
const dataModel = mongoose.model("datacollection1",dataSchema);
module.exports = dataModel;