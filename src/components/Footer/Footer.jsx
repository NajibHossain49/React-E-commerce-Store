import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-pink-200 via-red-100 to-yellow-50 text-gray-700 p-6">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Store Name</h2>
            <p className="text-gray-700 text-sm">
              Your one-stop shop for quality products and excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-700 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-700 hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-700">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <Mail size={16} />
                <span>support@store.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <MapPin size={16} />
                <span>123 Store Street, City, Country</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-700 text-sm">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-gray-700 text-sm">
            <p>© {new Date().getFullYear()} Store Name. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;