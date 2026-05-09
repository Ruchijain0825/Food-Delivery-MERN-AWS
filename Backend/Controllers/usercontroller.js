import uiModel from "../Models/uiModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken=(id) => 
{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login suer


const loginUser = async(req , res) =>
{
   const{email,password}=req.body;
   try{
    const user= await uiModel.findOne({email});
    if(!user)
    {
        return res.json({success:false,message:"user doesn't exist"})
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        return res.json({success:false,message:"invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true,message:"Login successfully",token})
   }catch(error)
   {
console.log(error);
res.json({success:false,message:"error"})

   }

}

//register user

const registerUser = async (req,res) =>
{
   const{name,password,email}=req.body;
   try{
    const exists = await uiModel.findOne({email});
    if(exists)
    {
        return res.json({success:false,message:"user already registererd"})
    }
    //validating email format & strong password
    if(!validator.isEmail(email))
    {
      return res.json({success:false,message:"please enter a valid email id"})
    }
    if(password.length<8)
    {
        return res.json({success:false,message:"please enter a strong password"})
    }
    //hashing
    //before creating this account first we will encrpyt this package
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser  = new uiModel({
        name:name,
        email:email,
        password:hashedPassword
    })
   const user= await newUser.save()
   const token = createToken(user._id)
   res.json({success:true,message:"registered Successfully",token})
   }catch(error)
   {
       console.log(error);
       res.json({success:false,message:"Error"})
   }
}
export {loginUser,registerUser}