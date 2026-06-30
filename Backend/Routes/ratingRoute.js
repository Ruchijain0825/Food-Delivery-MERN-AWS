import express from "express";
import { ratingController } from "../Controllers/RatingController.js";
import authMiddleware from "../Middlewares/auth.js";
const router = express.Router();
router.post("/customerrating",authMiddleware,ratingController)
export default router;
