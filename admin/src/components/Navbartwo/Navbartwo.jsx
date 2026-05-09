import React from 'react'
import './Navbartwo.css'
import {assets} from '../../assets/assets'
const Navbartwo = () => {
  return (
    <div className ='navbar'>
       <img className='logo' src={assets.logo} alt = " "/>
       <img className='profile' src= {assets.profile_image} alt = " "/>
       
       
      
    </div>
  )
}

export default Navbartwo
