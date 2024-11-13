import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/MyAuthContext";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  //   Handel Log out
  const handelLogOut = () => {
    logout()
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/login" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">ReactShop</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Only render 'My Orders' if the user is logged in */}
            {user && (
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            )}
            {/* Only render 'My Orders' if the user is logged in */}
            {user && (
              <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                My Orders
              </Link>
            )}

            <Link to="/productList" className="relative">
              Product List
            </Link>

            {/* Cart Icon without Counter */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-600 hover:text-gray-900" />
            </Link>

            {/* Auth Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-teal-600">
                  <User className="inline h-4 w-4 mr-2" />
                  {user?.email}
                </span>
                <button
                  onClick={() => handelLogOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {user && (
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              {user && (
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              <Link
                to="/cart"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart />
              </Link>
              {user ? (
                <>
                  {user && (
                    <span className="text-sm font-medium text-teal-600">
                      <User className="inline h-4 w-4 mr-2" />
                      {user?.email}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      handelLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-gray-900 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
