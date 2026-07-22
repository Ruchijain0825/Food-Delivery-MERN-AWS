import uiModel from "../Models/uiModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createToken = (id)=>
{
  return jwt.sign({id},process.env.JWT_SECRET)
}
export const adminLoginController = async(req,res)=>
{
  try{
    const {email,password}=req.body;

    const user = await uiModel.findById({email});

    if(!user)
    {
      return res.status(401).json({success:false,message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch)
    {
      return res.status(401).json({success:false,message:"Invaid credentials"})
    }
    if(user.role!=="admin")
    {
      return res.status(403).json({success:false,message:"Admin access denied"})
    }
    
   res.cookie("token",token,
    {
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",

      sameSite:process.env.NODE_ENV==="production"?"none":"lax",
      maxAge:7*24*60*60*1000
    }
   )
   return res.json({success:true,message:"Login successful"})

}
catch(error)
{
  return res.json({success:false,message:"Something went wrong"})
}
}
export const loginUser = async (req, res) => {
 try {
     const{email,password} = req.body;

     if(!email||!password)
     {
      return res.json({success:false,message:"please fill the required fields"})
     }
    const user = await uiModel.findOne({email})
    if(!user)
    {
      return res.json({success:false,message:"User is not register"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
      return res.json({success:false,message:"Invalid Credentials!!"})
    }
    const token = createToken(user._id)
    
   res.cookie("token",token,
    {
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",

      sameSite:process.env.NODE_ENV==="production"?"none":"lax",
      maxAge:7*24*60*60*1000
    }
   )
   return res.json({success:true,message:"Login successful"})

}
catch(error)
{
  return res.json({success:false,message:"Something went wrong"})
}
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  

    const existingemail = await uiModel.findOne({ email });

    

    if (existingemail) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    }

   

    const hashedPassword = await bcrypt.hash(password, 10);

   

    const user = await uiModel.create({
      name,
      email,
      password: hashedPassword,
    });

   

    return res.json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
  console.log("REGISTER ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await uiModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

  export const sendOtp = async (req, res) => {
  try {
    const {name,email,password,phone } = req.body;
  
    if (!name||!email||!password||!phone) {
      return res.json({ success: false, message: "Mandatory to fill all the fields" });
    }

    const hashedpassword = await bcrypt.hash(password,10)
    const otp = crypto.randomInt(100000, 1000000).toString();

   
    await otpModel.deleteMany({ phone });

   
    await otpModel.create({
      name:name,
      email:email,
      password:hashedpassword,
      phone:phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
    });

   

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
  
    return res.json({
      success: false,
      message: "Error sending OTP",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = await otpModel.findOne({ phone });

    if (!record) {
      return res.json({
        success: false,
        message: "OTP not found",
      });
    }
  if (record.expiresAt < new Date()) {
      return res.json({
        success: false,
        message: "OTP expired",
      });
    }


  

    const user = new uiModel({
      name:record.name,
      email:record.email,
      password:record.password,
      phone:record.phone,
      
    });

    await user.save();

    await otpModel.deleteOne({ phone });

    return res.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "OTP verification failed",
    });
  }
};
export const verifyOtpNodemailer = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await uiModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp) {
      return res.json({
        success: false,
        message: "No OTP found. Please request a new OTP.",
      });
    }

    if (
      String(user.otp) !== String(otp) ||
      user.otpExpiry < Date.now()
    ) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.isOtpVerified = true;

    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await uiModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isOtpVerified) {
      return res.json({
        success: false,
        message: "OTP not verified",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    user.resetotp = null;
    user.resetotpExpiry = null;
    
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


