import mongoose from 'mongoose'
 const userSchema = new mongoose.Schema({
   name:{type:String,required:true}, 
    email:{type:String,required:true,unique:true}, 
   
    password:{type:String,required:true},
    role:{type: String,enum:["user","admin"],default:"user"},
    otp:{type:String,default : null},
    otpExpiry:{type:Date,default:null},
     isOtpVerified:{ type: Boolean, default: false },
     
     cartData:{type:Object,default:{}} },
    
     {minimize:false})
      const uiModel = mongoose.models.user || mongoose.model("user",userSchema)
export default uiModel;
