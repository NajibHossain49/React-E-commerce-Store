import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/MyAuthContext";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { CartContext } from "../contexts/CartProvider";

const Navbar = () => {
  // Use the context to get the cartItems
  const { cartItems } = useContext(CartContext);

  // Get the number of items in the cart
  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

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
            {/* Only render 'Home' if the user is logged in */}
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

            {/* Only render 'Product List' if the user is logged in */}
            {user && (
              <Link to="/productList" className="relative">
                Product List
              </Link>
            )}

            {/* Cart Icon without Counter */}
            <Link to="/cart" className="relative group">
              {/* Increase the size of the cart icon */}
              <ShoppingCart
                size={32}
                className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300 text-4xl"
              />

              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-semibold rounded-full w-4 h-4 flex items-center justify-center animate-bounce -translate-x-1/2 translate-y-1/2">
                  {itemCount}
                </span>
              )}
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

              {user && (
                <Link to="/productList" className="relative">
                  Product List
                </Link>
              )}

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
