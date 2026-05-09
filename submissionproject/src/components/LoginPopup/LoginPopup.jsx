import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets'
import {FoodContext} from "../../Context/FoodContext"
import axios from 'axios'
import { toast } from "react-toastify"


const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(FoodContext)
    const [currState, setCurrState] = useState("Sign Up");//

    const [signdata, setsignData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [logindata, setloginData] = useState({
       
        email: "",
        password: ""
    })

    const onChangeSignHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setsignData(data => ({ ...data, [name]: value }))
    }
    const onChangeLoginHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setloginData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        let payload;
        if(currState==="Login")
        {
            new_url+='/api/user/login';
            payload=logindata
        }
        else
        {
            new_url+='/api/user/register';
            payload=signdata
        }
         const response = await axios.post(new_url, payload);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
            toast.success(response.data.message)
        
        }
        else {
            toast.error(response.data.message)
        }
    };
        

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState==="Sign Up"?(
                   <>
                     <input name='name' onChange={onChangeSignHandler} value={signdata.name} type="text" placeholder='Your name' required />
                      <input name='email' onChange={onChangeSignHandler} value={signdata.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeSignHandler} value={signdata.password} type="password" placeholder='Password' required /> </> ):
                     ( <> <input name='email' onChange={onChangeLoginHandler} value={logindata.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeLoginHandler} value={logindata.password} type="password" placeholder='Password' required /></>)}

                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </div>
            </form>
            
        </div>
    )
}

export default LoginPopup
