import RatingModel from "../Models/RatingModel.js";

export const getAdminRating = async(req,res)=>
{
    try
    {

    
    const rating = await RatingModel.find({}).populate("userId");

    return res.json({success:true,data:rating})
    } 
    catch(error)
    {
        return res.json({success:false,message:error.message})
    }
}