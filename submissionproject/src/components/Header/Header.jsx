import React, { useContext } from 'react'
import './Header.css'
import { FoodContext } from '../../Context/FoodContext'
import FoodItem from '../fooditem/Fooditem'
import {assets} from '../../assets/food-del-assets/assets/frontend_assets/assets.js'

const Header = () => {
    const{search,setSearch,searching,foodlist}=useContext(FoodContext)
    return (
       
        <div className='header' style = {{backgroundImage:`url(${assets.header_img})`}}>
                
                {search.search && ( <div className='header-search-content-wrapper'> 
            <div className='header-search-content' style={{zIndex:3}}> 
            {foodlist.filter(item=>item.name.toLowerCase().includes(search.search.toLowerCase())
        )
   
     .map((item,index)=>(<FoodItem key = {index} name={item.name} description={item.description} image ={item.image} price={item.price} id={item._id}/> 
     ))
          
} 

 
</div>
</div>
    )}

   
            <div className='header-contents'>
              
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button>View Menu</button>
            </div>
        </div>
       
    )
}

export default Header
