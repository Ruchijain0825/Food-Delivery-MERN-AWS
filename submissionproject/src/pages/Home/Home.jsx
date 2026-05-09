import React from 'react'
import {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/Exploremenu/Exploremenu'
import FoodRender from '../../components/FoodRender/FoodRender'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
    const[category ,setCategory]=useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu setCategory ={setCategory} category={category}/>
      <FoodRender category = {category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
