import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { auth } from "../firebase/firebase-config";
import { AuthContext } from "../contexts/MyAuthContext";

const Login = () => {
  // Access Context at the top level
  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Failed to log in";
        switch (error.code) {
          case "auth/wrong-password":
            errorMessage = "Incorrect password";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          default:
            errorMessage = error.message;
        }
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="text-sm text-gray-600 text-center">
            Don't have an account?
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
