
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/food-del-assets/assets/frontend_assets/assets";
import { FoodContext } from "../../Context/FoodContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { setToken, url, loadCartData } = useContext(FoodContext);
  const [currState, setCurrState] = useState("Sign Up")
  const[forgotemail,setforgotemail]=useState("")
  const [forgototp, setforgotOtp] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
 
  const [signdata, setsignData] = useState({
    name: "",
    email: "",
    password: "",
   
   
  });
  const [newPassword, setNewPassword] = useState("");
  const [logindata, setloginData] = useState({
    email: "",
    password: "",
  });
  const onChangeSignHandler = (e) => {
    const { name, value } = e.target;
    setsignData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({ ...prev, [name]: value }));
  };
  
  const onLogin = async (e) => {
  
    try {
   
      let payload=logindata
      // if (currState === "Login") {
      //   new_url += "/api/user/login";
      //   payload = logindata;
      // } else {
      //   new_url += "/api/user/register";
      //   payload = signdata;
      // }
       console.log("🔥 ACTUAL LOGIN URL:", `${url}/api/user/login`);
      const response = await axios.post(`${url}/api/user/login`, payload);
     


      if (response.data.success) {
       
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        loadCartData({ token: response.data.token });
        setShowLogin(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      
      toast.error("Something went wrong");
    }
  };

  const onSignin = async(e)=>
  {
     e.preventDefault();
    try {
       console.log("Signup API called");
  console.log(signdata);

      let payload=signdata;
       const response = await axios.post(`${url}/api/user/register`, payload);
       console.log(response.data);
      if (response.data.success) {
        console.log(response.data);
    setCurrState("Login")
      
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      
      toast.error("Something went wrong");
    }
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (currState === "Login") {
    console.log(currState);
    await onLogin(e);
  } else {
    await onSignin(e)
  }
};


// Forgot Password - Send OTP
const handleSendOtp = async () => {
  try {
    const response = await axios.post(
      url + "/api/user/forgotPassword",
      {
        email:forgotemail,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to send OTP");
  }
};
// Forgot Password - Verify OTP
const handleVerifyOtp = async () => {
  try {
    const response = await axios.post(
      url + "/api/user/verify-otp-nodemailer",
      {
        email:forgotemail,
        otp:forgototp,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    
    toast.error("OTP verification failed");
  }
};
// Forgot Password - Reset Password
const handleResetPassword = async () => {
  try {
    const response = await axios.post(
      url + "/api/user/resetPassword",
      {
        email:forgotemail,
        newPassword:newPassword,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Password reset failed");
  }
};
  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
       
    
          <div className="login-popup-inputs">
            {currState === "Sign Up" ? (
              <>
                <input
                  name="name"
                  onChange={onChangeSignHandler}
                  value={signdata.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
                <input
                  name="email"
                  onChange={onChangeSignHandler}
                  value={signdata.email}
                  type="email"
                  placeholder="Your email"
                />
                <input
                  name="password"
                  onChange={onChangeSignHandler}
                  value={signdata.password}
                  type="password"
                  placeholder="Password"
                  required
                />
              
              
              </>
                 
            ) : (
              <>
                <input
                  name="email"
                  onChange={onChangeLoginHandler}
                  value={logindata.email}
                  type="email"
                  placeholder="Your email"
                />
                <input
                  name="password"
                  onChange={onChangeLoginHandler}
                  value={logindata.password}
                  type="password"
                  placeholder="Password"
                  required
                />
                <p
  style={{ color: "tomato", cursor: "pointer" }}
  onClick={() => setShowForgotPassword(true)}
>
  Forgot Password?
</p>
{showForgotPassword && (
  <>
    <input
      type="email"
      placeholder="Enter your email"
      value={forgotemail}
      onChange={(e) => setforgotemail(e.target.value)}
    />
    <input
      type="text"
      placeholder="Enter OTP"
      value={forgototp}
      onChange={(e) => setforgotOtp(e.target.value)}
    />
    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <button type="button" onClick={handleSendOtp}>
      Send OTP
    </button>
     <br/>
    <button type="button" onClick={handleVerifyOtp}>
      Verify OTP
    </button>
    <br/>
    <button type="button" onClick={handleResetPassword}>
      Reset Password
    </button>
    <br/>
     <p>
    <span
      style={{ color: "tomato", cursor: "pointer" }}
      onClick={() => setShowForgotPassword(false)}
    >
      Back to Login
    </span>
    
  </p>
  </>
)}
<br/>


              </>
            )}
             <button type="submit">
              {currState === "Login" ?"Login": "Signin"}
            </button> 
            {/* SWITCH */}
            {currState === "Login" ? (
              <p>
                Create new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Already have account?{" "}
                <span onClick={() => setCurrState("Login")}>
                  Login here
                </span>
              </p>
            )}
           
          </div>
        
     
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to terms & privacy policy.</p>
        </div>
      </form>
    </div>
  );
}
export default LoginPopup;
