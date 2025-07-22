import React from 'react';
import { useCart } from '../context/CartContext';
import QuantityAdjuster from '../components/QuantityAdjuster';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartSubtotal } = useCart();

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="bg-f1-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-4">
                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-f1-red font-medium">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <QuantityAdjuster
                    quantity={item.quantity}
                    onIncrease={() => handleUpdateQuantity(item, item.quantity + 1)}
                    onDecrease={() => handleUpdateQuantity(item, item.quantity - 1)}
                  />
                  <p className="text-lg font-semibold text-gray-800 min-w-[80px] text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mr-4">Subtotal:</h2>
            <span className="text-f1-red text-2xl font-bold">{formatCurrency(getCartSubtotal())}</span>
          </div>

          <div className="mt-8 text-center">
            {/* Checkout */}
            <button className="bg-f1-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;