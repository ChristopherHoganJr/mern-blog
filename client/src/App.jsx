import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

axios.defaults.baseURL = "http://localhost:8000";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
