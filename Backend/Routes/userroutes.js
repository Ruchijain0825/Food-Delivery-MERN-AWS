import express from "express"
import { loginUser } from "../Controllers/usercontroller.js"
import { registerUser } from "../Controllers/usercontroller.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter;