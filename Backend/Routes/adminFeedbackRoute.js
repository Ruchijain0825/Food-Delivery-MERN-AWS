import express from "express";
import { getAdminFeedback } from "../Controllers/AdminFeedbackController.js";
const router =express.Router();
router.get('/adminfeedback',getAdminFeedback)
export default router;