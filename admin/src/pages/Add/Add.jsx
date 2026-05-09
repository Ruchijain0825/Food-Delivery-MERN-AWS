import React,{useState} from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from "axios";// it is used to create the new http request like get,post,put,delete
import { toast } from 'react-toastify';//by which we can easily get the toast notification
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

  const onChangeHandler = (event)=>//through which we can select any image from the located file location from the file explorer
  {
  const name= event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
  console.log("DATA:", data);
  console.log("CATEGORY:", data.category);//it will get the data from the input field and it will change the value according to the new value
  }

  const onSubmitHandler=async(event)=>// to make the api call we are creating the onSubmitHandler functio here
  { 
    event.preventDefault();
    const formData =new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image)

    const response = await axios.post(`${url}/api/food/add`,formData);//we are connecting it with database so any updation will eventually reflect on the database food schema
    if(response.data.success)
    {
     setData ({
    name: " ",
    description: " ",
    price: " ",
    category: "salad"
  })//the data will be reset *** if the respose is success the form will be reset 
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
          <img  src= {image?URL.createObjectURL(image): assets.upload_area} alt = "" />

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
          <option value="noodles">noodles</option>

          <option>salad</option>
          <option>rolls</option>
          <option>sandwich</option>
          <option>cake</option>
          <option>pasta</option>
          <option>noodles</option>
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
