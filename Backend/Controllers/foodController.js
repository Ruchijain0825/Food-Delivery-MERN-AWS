import foodModel from '../Models/foodModel.js'
import s3 from "../config/s3.js";
import {PutObjectCommand,DeleteObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuid} from "uuid"

const addFood = async(req,res)=>
{

try{
  if (!req.file) {
  return res.json({
    success: false,
    message: "Image is required",
  });
}


const file = req.file;
const fileName = `${uuid()}-${file.originalname}`;
const command = new PutObjectCommand({
  Bucket:process.env.AWS_BUCKET_NAME,
  Key:fileName,
  Body:file.buffer,
  ContentType: file.mimetype,
});
await s3.send(command);

const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
const{name,description,price,category} = req.body;
const food = new foodModel({
  name,description,category,price,image:imageUrl
})
await food.save();

res.json({success:true,message:"food added"})
console.log("food added")
}
catch(error)
{
  return res.json({success:false,message:"food is not added"})
}
}

const listFood = async(req,res)=>
{
  try{
    const foods  = await foodModel.find({});
    res.json({success:true,data:foods})
  }catch(error)
  {
    console.log(error);
    res.status(500).json({success:false,message:error.message})

  }
}

const removeFood =async(req,res) =>
{
  try{
   
    const food = await foodModel.findById(req.body.id)
     if(!food)
    {
      return res.json({success:false,message:"No food found"})
    }
     const imageKey = food.image.split('/').pop();
     const command = new DeleteObjectCommand({
      Bucket:process.env.AWS_BUCKET_NAME,
      Key:imageKey,
     })
     await s3.send(command);
     await foodModel.findByIdAndDelete(req.body.id)
     return res.json({success:true,message:"food deleted"})
     
  }catch(error)
  {
    console.log(error)
   res.json({success:false,message:error.message})
  }
}

export {addFood,listFood,removeFood}