import express from "express";

import { getAdminRating } from "../Controllers/AdminRatingController.js";
const router =express.Router();
router.get('/adminrating',getAdminRating)
export default router;