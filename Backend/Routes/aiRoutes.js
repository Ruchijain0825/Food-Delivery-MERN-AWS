import express from "express";
console.log("AI ROUTES LOADED");
import { foodAssistant } from "../Controllers/aiController.js";

const aiRouter = express.Router();
// aiRouter.post('/chat',foodAssistant);
aiRouter.post("/chat",(req,res,next)=>{
   console.log("POST /chat HIT");
   console.log(req.body);
   next();
}, foodAssistant);
export default aiRouter;