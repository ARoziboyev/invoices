import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";

function RootLeout() {
  return (
    <div>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLeout;
