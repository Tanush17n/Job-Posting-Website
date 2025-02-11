import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Feature/UserSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

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

  // const user = null;
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const logoutFunction = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      alert("You have successfully logged out");
      signOut(auth);
      navigate("/");
    }
  };

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
            <div className="profile-side">
              <Link to="/profile">
                <img
                  className="rounded-full justify-center w-12 ml-2"
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
        <Link to="/internships">Internships</Link>
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
              Logout <i className="bi bi-box-arrow-right ml-2 size-10"></i>
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
