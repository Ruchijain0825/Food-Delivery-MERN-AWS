import React, { useState, useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodRender from '../../components/FoodRender/FoodRender';
import AppDownload from '../../components/AppDownload/AppDownload';
import AIChat from '../../components/AiChatBot/AiChatBot';
import { FoodContext } from '../../Context/FoodContext';
const Home = () => {
    const [category, setCategory] = useState("All")

    const { foodlist, url } = useContext(FoodContext);

    return (
      <div>
        <Header/>
        <ExploreMenu setCategory={setCategory} category={category}/>
        <FoodRender category={category}/>

        <AIChat foodlist={foodlist} url={url}/>

        <AppDownload/>
      </div>
    )
}
export default Home;
