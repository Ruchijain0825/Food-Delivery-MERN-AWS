import express from "express"
import { addToCart } from "../Controllers/CartController.js"
import { removeFromCart } from "../Controllers/CartController.js"
import { getCart } from "../Controllers/CartController.js"
import authMiddleware from "../Middlewares/auth.js"
const cartRouter= express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;