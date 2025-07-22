import React from 'react';

function SearchInput({ value, onChange, placeholder, className }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f1-red ${className}`}
    />
  );
}

export default SearchInput;