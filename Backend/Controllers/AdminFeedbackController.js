import feedbackModel from "../Models/feedbackModel.js";
export const getAdminFeedback = async(req,res)=>
{
    try{

    
    const feedback = await feedbackModel.find({}).populate("userId")

    return res.json({success:true,data:feedback});
    }
    catch(error)
    {
        return res.json({success:false,message:error.message})
    }


}