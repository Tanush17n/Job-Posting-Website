import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import { toast } from "react-toastify";

function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LoginAdmin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://intershipbackend-vok7.onrender.com/api/admin/adminLogin",
        { username, password }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Store admin info in localStorage
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
        navigate("/adminPanel");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error("Admin login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Admin Login
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Admin login to Post Jobs and Internships
            </p>
          </div>
          <form onSubmit={LoginAdmin} className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="username" className="leading-7 text-sm text-gray-600">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-indigo-300"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
