import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../utils/api'; // Use mock API to fetch product
import SearchInput from '../components/SearchInput';
import { formatCurrency } from '../utils/helpers';

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Example of related items (static for prototype, could be fetched)
  const allRelatedItems = [
    { id: 'rel1', name: 'Race Day Socks', type: 'accessory' },
    { id: 'rel2', name: 'Formula Cap', type: 'cap' },
    { id: 'rel3', name: 'Engine Sound Tee', type: 'tee' },
    { id: 'rel4', name: 'Checkered Flag Scarf', type: 'accessory' },
    { id: 'rel5', name: 'Racing Glove Keychain', type: 'accessory' },
  ];

  const filteredRelatedItems = allRelatedItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductById(productId);
        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.message || 'Product not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching product details.');
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]); // Re-fetch if productId changes

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-gray-600">Product details unavailable.</div>;
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 lg:w-1/3 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-f1-red text-3xl font-semibold">{formatCurrency(product.price)}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-f1-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 self-center md:self-start mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md mt-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Items</h3>
        <div className="mb-6 flex justify-center">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search related items..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-f1-red"
          />
        </div>

        {searchQuery && filteredRelatedItems.length === 0 && allRelatedItems.length > 0 && (
          <p className="text-center text-gray-600 mb-6">No items match your search, showing all related items:</p>
        )}
        {searchQuery && filteredRelatedItems.length === 0 && allRelatedItems.length === 0 && (
          <p className="text-center text-gray-600 mb-6">No results found for your query.</p>
        )}
        {allRelatedItems.length === 0 ? (
          <p className="text-center text-gray-600">No related items available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(searchQuery && filteredRelatedItems.length > 0 ? filteredRelatedItems : allRelatedItems).map((item) => (
              <div key={item.id} className="bg-light-gray p-4 rounded-lg shadow-sm text-center">
                {/* For prototype, just display name, no link to new page */}
                <p className="font-medium text-gray-800">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductPage;