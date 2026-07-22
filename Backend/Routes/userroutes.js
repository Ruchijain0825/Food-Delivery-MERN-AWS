import express from "express"
import { forgotPassword, loginUser, resetPassword, sendOtp, verifyOtp, verifyOtpNodemailer,registerUser, adminLoginController } from "../Controllers/usercontroller.js"

import { loginRateLimiter,forgotPasswordRateLimiter,sendOtpRateLimiter,verifyOtpRateLimiter } from "../Middlewares/rateLimiter.js"
const userRouter = express.Router()


userRouter.post("/login",(req, res, next) => {
    console.log("🔥 LOGIN ROUTE REACHED");
    next();
  },loginRateLimiter,loginUser)
userRouter.post('/adminlogin',adminLoginController)
userRouter.post("/register",registerUser)
userRouter.post("/send-otp",sendOtpRateLimiter,sendOtp)
userRouter.post("/verify-otp",verifyOtp)
userRouter.post("/verify-otp-nodemailer",verifyOtpRateLimiter,verifyOtpNodemailer);
userRouter.post("/forgotPassword",forgotPasswordRateLimiter,forgotPassword);
userRouter.post('/resetPassword',resetPassword)

export default userRouter;