import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        required:[true,"Task title is required"],
        trim:true,
        maxLenght:[60,"title cannot exceed 60 characters"]
    },
    description:{
        type: String,
        trim: true,
        default: ""

    },
    iscomplete:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "user-info-collection", // Links the task to your User model
        required: true
    },
    
},{timestamps:true})// how will i manage Due Date
export const taskModel = model("task",taskSchema)