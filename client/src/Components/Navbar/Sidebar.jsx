import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    // console.log("Sidebar button clicked!");
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest(".sidebar") && // Check for clicks outside the sidebar
        !e.target.closest(".open-btn") // Ensure button clicks are ignored
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sidebarOpen]);

  const user = null;

  const logoutFunction = () => {};

  return (
    <div className="App2 mt-2 overflow-hidden">
      {/* Logo and Sidebar Open Button */}

      <Link to="/">
        <img src={logo} alt="Logo" id="nav2-img" />
      </Link>
      <button className="open-btn" onClick={openSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <span className="cursor-pointer close-btn" onClick={closeSidebar}>
          &times;
        </span>

        {user ? (
          <>
            {/* User Profile */}
            <div className="profile">
              <Link to="/profile">
                <img
                  className="rounded-full justify-center"
                  src={user.photo}
                  alt="User"
                />
              </Link>
              {/* <p className="text-center">
                Profile name{" "}
                <span className="font-bold text-blue-500">{user.name}</span>
              </p> */}
            </div>
          </>
        ) : (
          <div className="authMsg">Please log in !!</div>
        )}

        {/* Sidebar Links */}
        <Link to="/internship">Internships</Link>
        <Link to="/Jobs">Jobs</Link>
        <Link to="/" className="small">
          Contact Us
        </Link>
        <hr />

        {user ? (
          <div className="addmore">
            <Link to="/userapplication">
              <p>My Applications</p>
            </Link>
            <Link>
              <p>View Resume</p>
            </Link>
            <Link>
              <p>More</p>
            </Link>
            <button className="bt-log" onClick={logoutFunction}>
              Logout <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        ) : (
          <div className="addmore">
            <p>Register as a Student</p>
            <p>Register as an Employer</p>
          </div>
        )}
      </div>

      <div className="main">
        <span
          style={{ fontSize: "22px" }}
          className="open-btn"
          onClick={openSidebar}
        >
          &#9776;
        </span>
      </div>

      <div className="search2">
        <i className="bi bi-search"></i>
        <input type="search" placeholder="Search" />
      </div>

      {user ? (
        <></>
      ) : (
        <>
          <div className="reg">
            <Link to="/register">
              {" "}
              <button className="btn4">Register</button>
            </Link>
          </div>
          <div className="admin">
            <Link to={"/adminLog"}>
              <button id="admin"> Admin Login</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
