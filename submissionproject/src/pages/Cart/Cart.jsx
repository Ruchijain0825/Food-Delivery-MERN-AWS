
import React from 'react'
import  { useContext } from 'react'
import './Cart.css'
import {FoodContext} from "../../Context/FoodContext"
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const{cartItems,foodlist,removeFromCart,getTotalCartAmount,url,token, setToken,currency,deliveryCharge}=useContext(FoodContext);
    
  const navigate = useNavigate();

  return (
    <div className = "cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qunatity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        
       {foodlist.map((item,index) => {
  if (cartItems?.[item._id]>0){
    return (<div key={index}>
          
        <div className="cart-items-title cart-items-item">
          <img src={item.image} alt="" />
          <p>{item.name}</p>
          <p>{currency}{item.price}</p>
          <p>{cartItems[item._id]}</p>
          <p>{currency}{item.price * cartItems[item._id]}</p>
          <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
        </div>
        <hr />
      </div>
    );
  }
 
})}
       
        <div className = "cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <p>Delievery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2 }</b>
                  </div>
                 
            </div>
             <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have promocode, Enter it here </p>
              <div className = "cart-promocode-input">
                <input type = "text" placeholder= "promo-code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
