import express from "express";
import authMiddleware from "../Middlewares/auth.js";
import { feedbackController } from "../Controllers/feedbackController.js";
const router = express.Router();
router.post("/feedbackform",authMiddleware,feedbackController);
export default router;