import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const LoginAmin = async () => {
    if (username === "" || password === "") {
      alert("fill the blanks");
    } else {
      const bodyjson = {
        username: username,
        password: password,
      };
      axios
        .post(
          "https://intershipbackend-vok7.onrender.com/api/admin/adminLogin",
          bodyjson
        )
        .then((res) => {
          console.log(res, "data is send");
          alert("success");
          navigate("/adminPanel");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Admin Page
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Admin login to Post Jobs and Internships .
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="pass"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <button onClick={LoginAmin} className="bt3">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
