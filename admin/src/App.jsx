import React, { useState } from "react";

import Navbartwo from "./components/Navbartwo/Navbartwo";
import Sidebartwo from "./components/Sidebartwo/Sidebartwo";

import { Routes, Route, Navigate } from "react-router-dom";

import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Ordrers/Orders";
import AdminLogin from "./components/AdminLogin/AdminLogin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const url = "http://43.205.209.47";

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>

      <ToastContainer />

      {showLogin ? (

        <AdminLogin
          setShowLogin={setShowLogin}
          url={url}
        />

      ) : (

        <>
          <Navbartwo />

          <hr />

          <div className="app-content">

            <Sidebartwo />

            <Routes>

              <Route
                path="/"
                element={<Navigate to="/add" replace />}
              />

              <Route
                path="/add"
                element={<Add url={url} />}
              />

              <Route
                path="/list"
                element={<List url={url} />}
              />

              <Route
                path="/orders"
                element={<Orders url={url} />}
              />

            </Routes>

          </div>
        </>

      )}

    </div>
  );
};

export default App;