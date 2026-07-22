import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import "dotenv/config"
import foodRouter from './Routes/FoodRoute.js'
import userRouter from './Routes/userroutes.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoutes.js';
import feedbackRouter from './Routes/feedbackRoute.js'

import aiRouter from './Routes/aiRoutes.js'
import ratingRouter from './Routes/ratingRoute.js'
import adminFeedbackRouter from './Routes/adminFeedbackRoute.js';
import adminRatingRouter from './Routes/adminRatingRoute.js'
import { connectRedis } from './config/redis.js'
import helmet from "helmet"
import cookieParser from 'cookie-parser'

 connectDB();
 await connectRedis();
const app = express();

app.use(helmet())
//middlewares
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
}));

//api endpoints

aiRouter.get("/chat", (req,res)=>{
   res.send("AI Route Working");
});
app.use("/api/user", (req, res, next) => {
  console.log("🔥 USER API HIT:", req.method, req.originalUrl);
  next();
});
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/food",foodRouter)
app.use('/api/ai',aiRouter);
app.use('/api/customer',feedbackRouter);
app.use('/api/rating',ratingRouter);
app.use('/api/feedback',adminFeedbackRouter);
app.use('/api/rating',adminRatingRouter);


app.get("/",(req,res)=>
{
   res.send("API Working")
})
const port = process.env.PORT || 4000;
app.listen(port,()=>
{
    console.log(`server started on ${port}`)
})