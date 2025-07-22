import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Example: If you were to add icons (requires `npm install react-icons`)
// import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';

function Header() {
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center">
        {/* Menu icon placeholder (if needed for mobile, otherwise hidden) */}
        {/* <button className="md:hidden p-2 text-gray-600 hover:text-f1-red">
          <FaBars size={20} />
        </button> */}
        <Link to="/" className="text-f1-red text-3xl md:text-4xl font-display font-bold tracking-wide no-underline ml-2">
          F1 Streetwear
        </Link>
      </div>
      <nav className="hidden md:block"> {/* Hide nav links on small screens */}
        <ul className="flex space-x-6 items-center">
          <li><Link to="/" className="text-gray-800 hover:text-f1-red font-medium transition duration-300">Home</Link></li>
          {/* Add a link to the functional category if desired */}
          <li><Link to="/category/tees" className="text-gray-800 hover:text-f1-red font-medium transition duration-300">Shop</Link></li>
          {/* You can add more general links here if needed */}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <Link to="#" className="text-gray-600 hover:text-f1-red transition duration-300 hidden md:block">
          {/* <FaSearch size={20} /> */} Search
        </Link>

        {/* User/Login Icon */}
        {isAuthenticated ? (
          <div className="relative group">
            <span className="text-gray-600 cursor-pointer hover:text-f1-red transition duration-300">
              {/* <FaUser size={20} /> */} Hello, {user?.name || 'User'}
            </span>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 hidden group-hover:block z-20">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 no-underline">Profile</Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-f1-red transition duration-300">
            {/* <FaUser size={20} /> */} Login
          </Link>
        )}

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="text-gray-600 hover:text-f1-red transition duration-300">
          {/* <FaHeart size={20} /> */} Wishlist
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative text-gray-600 hover:text-f1-red transition duration-300">
          {/* <FaShoppingCart size={20} /> */} Cart ({getTotalItems()})
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-f1-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;