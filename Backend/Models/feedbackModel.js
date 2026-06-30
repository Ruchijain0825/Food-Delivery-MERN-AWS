import mongoose from "mongoose";
const feedbackSchema =new mongoose.Schema({

    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    name:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    comments:
    {
        type:String,
        
    },
    rating:
    {
        type:Number,
        
    }
 
},{timestamps:true})
export default mongoose.model("feedback",feedbackSchema)