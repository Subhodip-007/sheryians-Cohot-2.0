const { mongoose, Schema, model } = require("mongoose");

const songSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true

    },
    title:{
        type:String,
        required:true
    },  // many wore things like jondra artist date release 
    // but for now lets keep it simple 
   mood:{
        type:String,
        enum:{
            values:["sad","happy","surprised"],
            message:"enum this is"
        }

   }

})
 const songModel = model("songs-collection", songSchema)
 module.exports = songModel