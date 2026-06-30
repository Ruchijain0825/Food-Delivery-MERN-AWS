import React from 'react'
import './Verify.css'
import { useNavigate } from 'react-router-dom';
import {  useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useContext } from 'react';
import {FoodContext} from '../../Context/FoodContext'
import axios from "axios";
import {toast} from "react-toastify";
const Verify = () => {
    const{url}=useContext(FoodContext);
    const [searchParams,setSearhParams]=useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

 
    const navigate = useNavigate();

       useEffect(() => {
   
    verifyPayment();
  }, [])

   const verifyPayment =  async() =>
   {
    const response = await axios.post(url+"/api/order/verify",{success,orderId} );
    if(response.data.success)
    {
      toast.success(response.data.success);
      setTimeout(()=> 
      {
          navigate("/myorders");
      },5000)
     
    }
    else{
      navigate("/")
    }
   }


  return (
    <div className='verify'>
      <div className='spinner'></div>
      <p>Verifying your payment...</p>
       
    </div>
  )
}

export default Verify
