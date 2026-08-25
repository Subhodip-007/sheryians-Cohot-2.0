const { Schema, model, mongoose} = require("mongoose");

const notesSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user-data-collection",
        required: true
    },
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