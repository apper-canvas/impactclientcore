import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import Button from "@/components/atoms/Button";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  // If not authenticated, redirect will be handled by App.jsx
  if (!isAuthenticated) {
    return (
      <div className="loading flex items-center justify-center p-6 h-full w-full">
        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4"></path>
          <path d="m16.2 7.8 2.9-2.9"></path>
          <path d="M18 12h4"></path>
          <path d="m16.2 16.2 2.9 2.9"></path>
          <path d="M12 18v4"></path>
          <path d="m4.9 19.1 2.9-2.9"></path>
          <path d="M2 12h4"></path>
          <path d="m4.9 4.9 2.9 2.9"></path>
        </svg>
      </div>
    );
  }

  const logoutAction = {
    label: "Logout",
    icon: "LogOut",
    variant: "ghost",
    onClick: handleLogout
  };

  return (
    <div className="min-h-screen bg-background">
    <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                <Outlet
                    context={{
                        onMenuClick: handleMenuClick,
                        user: user,
                        logoutAction: logoutAction
                    }} />
            </main>
        </div>
    </div></div>
  );
};

export default Layout;