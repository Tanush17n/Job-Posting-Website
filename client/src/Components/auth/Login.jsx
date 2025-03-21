import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "../../Feature/UserSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginApi({
        email,
        password
      });
      
      // Update both JWT auth context and Redux state
      login(response.user, response.token);
      dispatch(reduxLogin({
        uid: response.user.id,
        name: `${response.user.firstName} ${response.user.lastName}`,
        emailid: response.user.email
      }));

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Update Redux state for Firebase auth
        dispatch(reduxLogin({
          uid: result.user.uid,
          photo: result.user.photoURL,
          name: result.user.displayName,
          emailid: result.user.email
        }));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google sign-in failed");
      });
  };

  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg justify-center shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="w-full p-8 lg:w-1/2">
          <div
            onClick={handleGoogleSignin}
            className="flex items-center h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
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
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Sign in with Google
            </h1>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">or</div>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-blue-500">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                required
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              New to Internshala?{" "}
              <a href="/register" className="text-blue-500">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
