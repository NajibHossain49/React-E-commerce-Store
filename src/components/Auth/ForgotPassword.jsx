import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/MyAuthContext"; // Make sure you are importing your context correctly

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to track errors
  const [successMessage, setSuccessMessage] = useState(""); // State to track success messages
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    resetPassword(email)
      .then(() => {
        setSuccessMessage("Password reset email sent!");
        setEmail(""); // Clear the email field after successful request
      })
      .catch((error) => {
        setError("Error sending password reset email. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {/* Form for entering email */}
        <form onSubmit={handlePasswordReset} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Disable the button when loading
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Email"}{" "}
            {/* Loading state text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
