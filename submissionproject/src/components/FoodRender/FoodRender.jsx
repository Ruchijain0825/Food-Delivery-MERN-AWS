import React, { useContext} from 'react'
import './FoodRender.css'
import FoodItem from '../fooditem/Fooditem';
import {FoodContext} from "../../Context/FoodContext";
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets';

const FoodRender = ({category}) => {

  const {foodlist} = useContext(FoodContext);

  return (
    < div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      
     <div className='food-display-list'>
   {foodlist.map((item,index)=>{
   
         
          if (category==="All" || category.trim().toLowerCase()===item.category.trim().toLowerCase()) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
          
           
          }})}
          

</div> 

    </div>
    
  )
}

export default FoodRender
