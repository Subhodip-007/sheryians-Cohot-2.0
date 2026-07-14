const mongoose = require('mongoose');
const Dataschema= new mongoose.Schema({
    title:String,
    description:String
})
const Datamodel = mongoose.model("Task-collection",Dataschema);
module.exports = Datamodel;