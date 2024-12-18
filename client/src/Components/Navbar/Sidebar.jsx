import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest("opne-btn")
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sidebarOpen]);
  const user = 1;
  return (
    <>
      <div className="App2 mt-2 overflow-hidden">
        <img src={logo} alt="" />

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <span className="cursor-pointer close-btn " onClick={closeSidebar}>
            &times;
          </span>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
