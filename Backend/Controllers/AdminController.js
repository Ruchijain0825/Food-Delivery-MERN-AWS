import AdminModel from "../Models/AdminModel.js";
import bcrypt from "bcrypt"
export const loginController = async(req,res)=>
{
    try{
        const{email,password} = req.body;

        const user = await AdminModel.findOne({email})
        if(!user)
        {
           return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.comapre(password,user.password)
        if(!isMatch)
        {
            return res.json({success:false,message:"Invalid credrentials"})
        }
    }
    catch(error)
    {
        
    }
}