import feedbackModel from "../Models/feedbackModel.js";
export const feedbackController = async(req,res)=>
{
    const userId = req.body.userId;
    const{comments}=req.body;
    try{ 
    const feedback = new feedbackModel(
        {
            comments,
            userId
        }
    
    )
   
    await feedback.save();
    res.json({success:true,message:"feedback sudmitted successfully"})
}catch(error)
{
    return res.json({success:false,message:"error while submitting feeback"})
}
}