import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 text-center text-sm mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">&copy; 2025 F1-Inspired Streetwear. All rights reserved.</p>
        <nav>
          <ul className="flex flex-wrap justify-center space-x-4">
            <li><Link to="/privacy-policy" className="hover:text-f1-red transition duration-300 no-underline">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-f1-red transition duration-300 no-underline">Terms of Service</Link></li>
            <li><Link to="/contact-us" className="hover:text-f1-red transition duration-300 no-underline">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;