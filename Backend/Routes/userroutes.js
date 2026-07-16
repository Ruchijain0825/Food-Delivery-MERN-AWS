import express from "express"
import { forgotPassword, loginUser, resetPassword, sendOtp, verifyOtp, verifyOtpNodemailer,registerUser } from "../Controllers/usercontroller.js"


const userRouter = express.Router()


userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/send-otp",sendOtp)
userRouter.post("/verify-otp",verifyOtp)
userRouter.post("/verify-otp-nodemailer",verifyOtpNodemailer);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.post('/resetPassword',resetPassword)

export default userRouter;