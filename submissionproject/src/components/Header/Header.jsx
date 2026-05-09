import React, { useContext } from 'react'
import './Header.css'
import { FoodContext } from '../../Context/FoodContext'
import FoodItem from '../fooditem/Fooditem'

const Header = () => {
    const{search,setSearch,foodlist,city_list,showcity,setshowcity,}=useContext(FoodContext)
    return (
       
        <div className='header'>
           
                {search.search && ( <div className='header-search-content-wrapper'> 
            <div className='header-search-content'> {foodlist.filter(item=>item.name.toLowerCase().includes(search.search.toLowerCase())
        )
   
     .map((item,index)=>(<FoodItem key = {index} name={item.name} description={item.description} image ={item.image} price={item.price} id={item._id}/> 
     ))
          
} 

 
</div>
</div>
    )}

    {showcity &&(<div className='show-city-wrapper'>
        <ul className='show-city-content'>
            {city_list.map((item,index)=>
            
            {
                return (
                
                    <li className='show-city-content-li' key ={index}>{item.city_name} {item.restaurant}</li>
                )
            }
            )}
        </ul>
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
