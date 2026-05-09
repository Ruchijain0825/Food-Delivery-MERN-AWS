import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import "dotenv/config"
import foodRouter from './Routes/FoodRoute.js'
import userRouter from './Routes/userroutes.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoutes.js';





 connectDB();
const app = express();
const port =4000;

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints


 app.use("/images", express.static("Uploads"));
//through which we can see the uploaded image on the web browser so basically what we have done here is we have mounted this folder at this end point
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>
{
   res.send("API Working")
})

app.listen(port,()=>
{
    console.log(`server started on http://localhost:${port}`)
})