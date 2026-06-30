
import RatingModel from "../Models/RatingModel.js";
export const ratingController = async(req,res)=>
{
    const userId = req.body.userId;
try{


    const{foodId,rating}=req.body;
        if(!foodId||!rating)
        {
           return res.json({success:false,message:"required"})
        }
    
    const starrating = new RatingModel({
        foodId,
        rating,
        userId

    })

    await starrating.save();
} catch(error)
{
    return res.json({success:false,message:error})
}
}