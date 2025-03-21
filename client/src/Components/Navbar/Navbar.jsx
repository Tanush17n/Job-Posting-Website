import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import "./navbar.css";
import Sidebar from "./Sidebar";
import { signInWithPopup, signOut, getIdToken } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout as reduxLogout, login as reduxLogin } from "../../Feature/UserSlice";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const user = useSelector(selectUser);
  const [isDivVisibleForLogin, setDivVisibleForLogin] = useState(false);
  const [isStudent, setStudent] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: authLogin, logout: authLogout } = useAuth();

  const loginFunction = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Get Firebase ID token
      const firebaseToken = await getIdToken(result.user);
      
      // Update Redux state for Firebase auth
      dispatch(reduxLogin({
        uid: result.user.uid,
        photo: result.user.photoURL,
        name: result.user.displayName,
        emailid: result.user.email
      }));

      // Update JWT auth context with Firebase token
      authLogin(
        {
          id: result.user.uid,
          firstName: result.user.displayName?.split(' ')[0] || '',
          lastName: result.user.displayName?.split(' ')[1] || '',
          email: result.user.email
        },
        firebaseToken
      );

      // Store token in localStorage for API requests
      localStorage.setItem('token', firebaseToken);

      toast.success("Successfully logged in with Google!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed");
    }
    setDivVisibleForLogin(false);
  };

  const logoutFunction = async () => {
    try {
      // Firebase logout
      await signOut(auth);
      
      // Clear JWT auth context
      authLogout();
      
      // Clear Redux state
      dispatch(reduxLogout());
      
      // Clear any stored tokens
      localStorage.removeItem('token');
      
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  const showLogin = () => {
    setDivVisibleForLogin(true);
  };

  const closeLogin = () => {
    setDivVisibleForLogin(false);
  };

  return (
    <div>
      <nav className="nav1">
        <ul>
          <div className="img">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="elem">
            <Link to={"/Internships"}>
              <p>
                Interships <i id="ico" className="bi bi-caret-down"></i>
              </p>
            </Link>
            <Link to={"/Jobs"}>
              <p className="ml-4">
                Jobs <i id="ico2" className="bi bi-caret-down"></i>
              </p>
            </Link>
          </div>

          {user ? (
            <>
              <div className="profile">
                <Link to={"/profile"}>
                  <img
                    src={user?.photo}
                    alt="user"
                    className="rounded-full w-12 mt-2"
                  />
                </Link>
                <Link to={"/profile"}>
                  <i className="bi bi-caret-down"></i>
                </Link>
              </div>
              <button className="btn-logout" onClick={logoutFunction}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <div className="auth">
                <button className="btn1">
                  <Link to={"/login"}>Login</Link>
                </button>

                <button className="btn2">
                  <Link to={"/register"}>Register</Link>
                </button>
              </div>
              <div className="adminMsg">
                <Link to={"/adminLogin"}>
                  <button className="adminbtn">Admin</button>
                </Link>
              </div>
            </>
          )}
        </ul>
      </nav>

      {/* <div className="login">
        {isDivVisibleForLogin && (
          <>
            <button id="cross" onClick={closeLogin}>
              <i className="bi bi-x"></i>
            </button>

            {isStudent ? (
              <>
                <div className="py-6">
                  <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="w-full p-8 lg:w-1/2">
                      <span
                        onClick={loginFunction}
                        className="flex
 items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100"
                      >
                        <div className="px-4 py-3">
                          <svg
                            className="h-6 w-6  cursor-pointer"
                            viewBox="0 0 40 40"
                          >
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                              fill="#FF3D00"
                            />
                            <path
                              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#1976D2"
                            />
                          </svg>
                        </div>
                        <h4 className="text-gray-500  cursor-pointer">
                          Login With Google
                        </h4>
                      </span>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="border-b- w-1/5 lg:w-1/4"></span>
                        <p className="text-gray-500 text sm font-bold mb-2">
                          {" "}
                          or
                        </p>
                        <span className="border-b- w-1/5 lg:w-1/4"></span>
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Email{" "}
                        </label>
                        <input
                          className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="email"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                          </label>
                          <a href="/" className="text-xs text-blue-500">
                            Forget Password?
                          </a>
                        </div>
                        <input
                          className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          placeholder="Must be atleast 6 characters"
                          type="password"
                        />
                      </div>
                      <div className="mt-8">
                        <button className="btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 ">
                          Login
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm">
                          new to internarea?
                          <Link
                            to={"/register"}
                            className="text-blue-500 cursor-pointer"
                            onClick={closeLogin}
                          >
                            Register
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                  <div className="w-full p-8 lg:w-1/2">
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email{" "}
                      </label>
                      <input
                        className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Password
                        </label>
                        <a href="/" className="text-xs text-blue-500">
                          Forget Password?
                        </a>
                      </div>
                      <input
                        className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        placeholder="Must be atleast 6 characters"
                        type="password"
                      />
                    </div>
                    <div className="mt-8">
                      <button className="btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 ">
                        Login
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm">
                        new to internarea? Register(
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={closeLogin}
                        >
                          Student
                        </span>
                        /
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={closeLogin}
                        >
                          company
                        </span>
                        ){" "}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div> */}
      <Sidebar />
    </div>
  );
}

export default Navbar;
