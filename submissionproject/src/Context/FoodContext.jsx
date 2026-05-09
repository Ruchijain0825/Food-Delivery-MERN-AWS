import { createContext, useEffect, useState } from "react";
import { city_list,menu_list } from "../assets/food-del-assets/assets/frontend_assets/assets";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export const FoodContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
   const[showcity,setshowcity]=useState(false);
    const [foodlist, setFoodList] = useState([]);// this state is used for fetching the food from the database 
    const [cartItems, setCartItems] = useState({});
    const[search,setSearch]=useState({search:""});
    const [token, setToken] = useState(()=>
    {
        return localStorage.getItem("token")||""
    })
    const currency = "₹";
    const deliveryCharge = 50;
    const searching = (e)=>
  { 

    const name = e.target.name;
    const value = e.target.value;
    setSearch(search=>({...search,[name]:value}));
    setshowcity(false)
    
  }

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });

        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = foodlist.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        console.log(response.data)
        
        setFoodList(response.data.data||[])
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: {token}});
        setCartItems(response.data.cartData||{});
    }

    useEffect(() => {
        async function loadData() {
            try{ 
            await fetchFoodList();

            const savedToken = localStorage.getItem("token")
            if (savedToken) {
                setToken(savedToken)
                await loadCartData(savedToken)
            }
        }
        catch(error)
        {
            console.log(error)
        }
        }
        loadData()
    }, [])
   
    const contextValue = { 
        url,
        foodlist,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        city_list,
        showcity,setshowcity,
        deliveryCharge,search,setSearch,searching
    };

    return (
        <FoodContext.Provider value={contextValue}>
            {props.children}
        </FoodContext.Provider>
    )

}

export default StoreContextProvider;