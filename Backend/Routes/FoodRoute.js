import express from 'express'
import { addFood, listFood ,removeFood } from '../Controllers/foodController.js'
import upload from '../Middlewares/upload.js';

const foodRouter = express.Router();
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter