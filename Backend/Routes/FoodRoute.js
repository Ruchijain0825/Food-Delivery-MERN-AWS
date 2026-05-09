import express from 'express'
import { addFood, listFood ,removeFood } from '../Controllers/foodController.js'
import multer from 'multer'// we have created the image storage system

const foodRouter = express.Router();
//Image storage engine

const storage =multer.diskStorage({
    destination:"Uploads",//where do we want to store the image
    
    filename:(req,file,cb)=>
    {
        return cb(null,`${Date.now()}${file.originalname}`)//by that our filename will become unique
    }
})
const upload = multer({storage:storage})//is used to configure Multer to handle file uploads in a Node.js/Express app, and tells Multer where and how to store the uploaded files.

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter