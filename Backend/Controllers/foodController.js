import foodModel from '../Models/foodModel.js'
import fs from 'fs'

//add food items

const addFood =  async (req,res)=>
{
  try{
     console.log(req.body.category)
    let image_filename = `${req.file.filename}`;//using this we can store the uploaded file in this variable
 
    const food = new foodModel({
        name:req.body.name,  
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })//whenever we hit this this api , in body we will send these details and we will access it in the backend through this function
    //using this api we can add new food items to our database
   
        await food.save();// using this method the food item will be saved in the database
        res.json({success:true,message:"food added"})// it will be visible in the client side 
       
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}
// though this api we can see the listed food items in our database
const listFood = async(req,res)=>
{
  try{
    const foods  = await foodModel.find({});
    res.json({success:true,data:foods})
  }catch(error)
  {
    console.log(error);
    res.json({success:false,message:"Error"})

  }
}// we can access all the food items and send them as a response

//remove food item

const removeFood =async(req,res) =>
{
  try{

    const food = await foodModel.findById(req.body.id);//we are requesting from the json body itself which is present in the client side ....
    fs.unlink(`Uploads/${food.image}`,()=>{})//we are manually performing the write operation that's why we are using the filesystem here
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food Removed"})
  }catch(error)
  {
    console.log(error)
   res.json({success:false,message:"Error"})
  }
}

export {addFood,listFood,removeFood}