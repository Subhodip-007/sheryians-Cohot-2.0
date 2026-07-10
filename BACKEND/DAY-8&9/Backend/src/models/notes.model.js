const mongoose = require('mongoose');
 
const notesSchema = new mongoose.Schema({
      title:String,
    description:String
})
 const notemodel = mongoose.model("notesData",notesSchema)
 module.exports = notemodel;