import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchInput from '../components/SearchInput';
import { fetchProductsByCategory } from '../utils/api';
import { categoriesData } from '../data/categories';

function CategoryPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = categoriesData.find(cat => cat.slug === categorySlug);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductsByCategory(categorySlug);
        if (response.success) {
          setProducts(response.data);
        } else {
          setError(response.message || 'Could not fetch products for this category.');
        }
      } catch (err) {
        setError('An error occurred while fetching products.');
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categorySlug]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        {currentCategory ? currentCategory.name : 'Category'}
      </h1>

      <div className="mb-6 flex justify-center">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${currentCategory ? currentCategory.name : 'products'}...`}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-f1-red"
        />
      </div>

      {searchQuery && filteredProducts.length === 0 && products.length > 0 && (
        <p className="text-center text-gray-600 mb-6">No items match your search for "{searchQuery}". Displaying all items:</p>
      )}

      {filteredProducts.length === 0 && products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products available in this category.</p>
      ) : filteredProducts.length === 0 && searchQuery.length > 0 ? (
        <p className="text-center text-gray-600 text-lg">No results found for your query.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(searchQuery ? filteredProducts : products).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="no-underline">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;