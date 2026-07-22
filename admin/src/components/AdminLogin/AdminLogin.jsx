import React, { useState } from "react";
import "./AdminLogin.css";

const AdminLogin = () => {

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

    console.log(loginAdminData);
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