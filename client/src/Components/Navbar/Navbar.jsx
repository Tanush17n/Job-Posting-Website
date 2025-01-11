import React from "react";
import logo from "../../Assets/logo.png";
import "./navbar.css";
import Sidebar from "./Sidebar";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";

function Navbar() {
  const loginFunction = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const user = 1;
  return (
    <div>
      <nav className="nav1">
        <ul>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <div className="elem">
            <p>
              Interships <i className="bi bi-caret-down"></i>
            </p>
            <p className="ml-4">
              Jobs <i className="bi bi-caret-down"></i>
            </p>
          </div>
          <div className="search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="auth">
            <button className="btn1" onClick={loginFunction}>
              Login
            </button>
            <button className="btn2">Register</button>
          </div>
          <div className="flex mt-7 hire">Hire Talent</div>
          <div className="adminMsg">
            <button>Admin</button>
          </div>
        </ul>
      </nav>
      <Sidebar />
    </div>
  );
}

export default Navbar;
