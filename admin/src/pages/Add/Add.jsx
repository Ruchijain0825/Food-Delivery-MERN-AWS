import React,{useState} from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const Add = ({url}) => {
  
  const [image,setImage]=useState(false)
  
  const[data,setData] =useState(()=>
    {

      const dataInfor = localStorage.getItem("data");
      return dataInfor?JSON.parse(dataInfor):
      {
    name: "",
    description: "",
    price: "",
    category: "salad"
  }
})
useEffect(()=>
{
  localStorage.setItem("data",JSON.stringify(data))
},[data])

  const onChangeHandler = (event)=>
  {
  const name= event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
 
  }

  const onSubmitHandler=async(event)=>
  { 
    event.preventDefault();
    const formData =new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image)

    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success)
    {
     setData ({
    name: " ",
    description: " ",
    price: " ",
    category: "salad"
  })
  setImage(false)
toast.success(response.data.message)
    }

  else{
toast.error(response.data.message)
  }
}
  
  return(
<div>
  <div classNmae= "add">
    <form className='flex-col' onSubmit={onSubmitHandler}>
      <div classname = "add-img-upload flex-col">
       

         <p>Upload Image</p>
        <label htmlFor = "image">
          <img  src= {image?URL.createObjectURL(image): assets.upload_area} alt = "" width="160px" />

        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type= "file" id= "image" hidden required/>

      </div>


     <div className = "add-product-name flex-col">
      <p>Product Name</p>
      <input onChange ={onChangeHandler} value ={data.name} type= "text" name="name" placeholder = "Type Here"/>

     </div>

     <div className ="add-product-description flex-col">
      <p>Product Description</p>
      <textarea onChange ={onChangeHandler} value = {data.description} name ="description"  rows="6" placeholder ="write content here "></textarea>
     </div>


     <div className="add-category-price">
      <div className="add-category flex-col">
        <p>Product category</p>
        <select onChange ={onChangeHandler} name  = "category" value ={data.category}>
          <option value="salad">salad</option>
          <option value="desserts">desserts</option>
          <option value="rolls">rolls</option>
          <option value="sandwich">sandwich</option>
          <option value="cake">cake</option>
          <option value="pasta">pasta</option>
          <option value="pure Veg">pure Veg</option>
          <option value="noodles">Beverages</option>
        </select>

      </div>

      <div className="add-price flex-col">
        <p>product price</p>
        <input onChange ={onChangeHandler} value= {data.price} type= "Number" name= "price" placeholder =" $20"/>
      </div>
      
     </div>
     <button type = "submit" className = "add-btn">Add</button>

    </form>
  </div>
</div>
  )
}
export default Add
