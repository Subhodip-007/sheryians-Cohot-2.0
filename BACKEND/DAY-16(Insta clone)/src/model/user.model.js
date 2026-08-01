const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        unique:[true,"username already exist"],
        required:[true,"user name is required"],
    },
    Email:{
        type:String,
        unique:[true,"Email already exist"],
        required:[true,"Email name is required"],
    },
    Password:{
        type:String,
        required:[true,"Password is required"],
    },
    Bio:{
        type:String,
    },
    ProfileImage:{ // insta has a defaule profile image..
        type: String,
        default:"https://ik.imagekit.io/e30yzaknwc/default%20ing.png"
    },
    // this is the normal or the most basic way 
    // let suppose u have 242 million followres
    //  and 1 userid = 12bytes
    //  so 242 million userid = 3.3gb 
    //  now max document size in mongoDB is 16MB
    // one object is knows as document 
    /**
     * SQL	    MongoDB
    Database	Database
    Table	   Collection
    Row	       Document
    Column	   Field
     */
    // now insted of the we will use the concept of edge collection
    // following:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"users"
    
    // }],
    //  followers:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"users"
    
    // }],
})
const userModel = mongoose.model("users",userSchema)

module.exports = userModel;