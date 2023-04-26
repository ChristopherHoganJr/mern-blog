import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='p-3 flex flex-col gap-3'>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
