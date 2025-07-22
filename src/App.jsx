import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
// No specific CSS import needed here for custom styles, as they are inlined via Tailwind

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* Main application container, using flex to manage header, content, and footer */}
          <div className="flex flex-col min-h-screen">
            <Header />
            {/* Main content area that grows to fill available space */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categorySlug" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                {/* Placeholder pages */}
                <Route path="/profile" element={<div className="p-8 text-center"><h1 className="text-3xl font-bold mb-4">Profile Page</h1><p className="text-gray-600">This page is a placeholder for future development.</p></div>} />
                <Route path="/wishlist" element={<div className="p-8 text-center"><h1 className="text-3xl font-bold mb-4">Wishlist Page</h1><p className="text-gray-600">This page is a placeholder for future development.</p></div>} />
                <Route path="*" element={<div className="p-8 text-center"><h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1><p className="text-gray-600">The page you are looking for does not exist.</p></div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;