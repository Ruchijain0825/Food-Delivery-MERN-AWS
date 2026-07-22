import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = ({url,setShowLogin}) => {

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

  // ADMIN LOGIN
  const onLogin = async (e) => {
    e.preventDefault();

    try {

      const payload = loginAdminData;

      console.log(
        "🔥 ACTUAL ADMIN LOGIN URL:",
        `${url}/api/user/adminlogin`
      );

      const response = await axios.post(
        `${url}/api/user/adminlogin`,
        payload
      );

      console.log(response.data);

      if (response.data.success) {

        // Agar backend token bhej raha hai
        if (response.data.token) {
          localStorage.setItem(
            "adminToken",
            response.data.token
          );
        }
         setShowLogin(false)
        toast.success(response.data.message);

        navigate("/add");

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
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