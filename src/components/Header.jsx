import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'; 

function Header() {
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); 
  };

  return (
    <header className="bg-white text-gray-800 p-4 md:px-8 flex justify-between items-center shadow-md border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-f1-red text-3xl md:text-4xl font-extrabold tracking-tight no-underline transform hover:scale-105 transition duration-300">
          F1 Streetwear
        </Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex space-x-8 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-f1-red font-semibold text-lg transition duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-f1-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/category/tees" className="text-gray-700 hover:text-f1-red font-semibold text-lg transition duration-300 relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-f1-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* User */}
        {isAuthenticated ? (
          <div className="relative group hidden md:block"> 
            <span className="text-gray-600 cursor-pointer hover:text-f1-red transition duration-300 flex items-center gap-2">
              <FaUser size={20} className="text-gray-500 group-hover:text-f1-red transition duration-300" />
              <span className="font-medium">Hello, {user?.name || 'User'}</span>
            </span>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1 hidden group-hover:block z-20 animate-fade-in-down">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-f1-red transition duration-200 no-underline">Profile</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-f1-red transition duration-300"> {/* Hide on mobile, show on desktop */}
            <FaUser size={20} className="text-gray-500 hover:text-f1-red transition duration-300" />
            <span className="font-medium">Login</span>
          </Link>
        )}

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="hidden md:block text-gray-600 hover:text-f1-red transition duration-300"> {/* Hide on mobile, show on desktop */}
          <FaHeart size={20} className="text-gray-500 hover:text-f1-red transition duration-300" />
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative text-gray-600 hover:text-f1-red transition duration-300">
          <FaShoppingCart size={20} className="text-gray-500 hover:text-f1-red transition duration-300" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-f1-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {getTotalItems()}
            </span>
          )}
        </Link>

          <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-f1-red focus:outline-none">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-fade-in">
          <ul className="flex flex-col space-y-8 text-center text-2xl">
            <li>
              <Link to="/" onClick={toggleMobileMenu} className="text-gray-800 hover:text-f1-red font-semibold transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/category/tees" onClick={toggleMobileMenu} className="text-gray-800 hover:text-f1-red font-semibold transition duration-300">Shop</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleMobileMenu} className="text-gray-800 hover:text-f1-red font-semibold transition duration-300">
                    Hello, {user?.name || 'User'}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-semibold transition duration-300 focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={toggleMobileMenu} className="text-gray-800 hover:text-f1-red font-semibold transition duration-300">
                  Login
                </Link>
              </li>
            )}
            <li>
                <Link to="/wishlist" onClick={toggleMobileMenu} className="text-gray-800 hover:text-f1-red font-semibold transition duration-300">
                    Wishlist
                </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;