import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    foodId:
    {
        type:String,
        required:true
    },
    rating:
    {
        type:Number,
        required:true

    }
},{timestamps:true})

export default mongoose.model("rate",ratingSchema)