import React from 'react';
import { formatCurrency } from '../utils/helpers';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex-grow flex flex-col justify-between"> 
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-base mb-3 leading-relaxed">{product.description.substring(0, 80)}...</p>
        </div>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100"> 
          <span className="text-f1-red text-2xl font-bold">{formatCurrency(product.price)}</span> 
        </div>
      </div>
    </div>
  );
}

export default ProductCard;