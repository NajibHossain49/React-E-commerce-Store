import React, { useContext, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/MyAuthContext";

const Register = () => {
  // Access Context at the top level
  const { createUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const validatePassword = (password) => {
      // Check password length (at least 8 characters)
      if (password.length < 8) {
        return "Password should be at least 8 characters long.";
      }

      // Check for at least one uppercase letter, one lowercase letter, one number, and one special character
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      }

      return;
    };

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Validate password complexity
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      return;
    }

    // Email validation (basic format check)
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|google\.com|yahoo\.com|outlook\.com)$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    setLoading(true);
    setError(""); // Reset error state

    // Create a password-based account
    createUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        navigate("/login"); // Redirect to the home page
      })
      .catch((error) => {
        // Handle errors from Firebase registration
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("This email is already registered");
            break;
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          default:
            setError("Error creating account");
        }
      })
      .finally(() => {
        setLoading(false);
        event.target.reset(); // Reset the form after submission
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
          <div className="text-sm text-gray-600 text-center">
          Already have an account? 
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
                 Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
