const { Schema, model } = require("mongoose");

const notesSchema = new Schema({
    title:{
        type:String,
        required:[true,"title is required for notes creation.."]
    },
    description:{
         type:String,
        required:[true,"title is required for notes creation.."]
        
    },
    
}, {
        timestamps: true
    }
)
const notesModel = model("notes-collection",notesSchema);
module.exports = notesModel;