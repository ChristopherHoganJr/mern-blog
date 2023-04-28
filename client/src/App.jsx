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
import NewPost from "./pages/NewPost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/new"} element={<NewPost />} />
          <Route path={"/post/:post_id"} element={<SinglePost />} />
          <Route path={"/post/edit/:post_id"} element={<EditPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
