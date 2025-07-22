import React from 'react';

function QuantityAdjuster({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition duration-200"
      >
        -
      </button>
      <span className="text-lg font-semibold text-gray-800 min-w-[30px] text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition duration-200"
      >
        +
      </button>
    </div>
  );
}

export default QuantityAdjuster;