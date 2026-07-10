const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 title : String,
 description:String
});
const notesmodel = mongoose.model("NotesData", userSchema);

module.exports = notesmodel;