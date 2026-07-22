import React, { useState } from "react";
import "./AdminLogin.css";
import {useNavigate} from "react-router-dom"

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginAdminData, setLoginAdminData] = useState({
    email: "",
    password: "",
  });

  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;

    setLoginAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();

   const onLogin = async (e) => {
   
     try {
    
       let payload=loginAdminData
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
        
        
         navigate("/Add")
         setShowLogin(false);
         toast.success(response.data.message);
       } else {
         toast.error(response.data.message);
       }
     } catch (error) {
       
       toast.error(
     error.response?.data?.message || "Something went wrong"
   );
     }
   };
  };

  return (
    <div className="admin-login">

      <form
        className="admin-login-container"
        onSubmit={onLogin}
      >

        <h2>Admin Login</h2>

        <p>Login to manage your food delivery app</p>

        <div className="admin-login-inputs">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={loginAdminData.email}
            onChange={onChangeLoginHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginAdminData.password}
            onChange={onChangeLoginHandler}
            required
          />

        </div>

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;