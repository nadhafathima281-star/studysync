import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./protectedLayout.css";

export default function ProtectedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="layout-body">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <main className="main-content page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}