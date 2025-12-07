import { useState, useEffect } from 'react';
import PageHeading from './PageHeading';
import ProductListings from './ProductListings';
import type { Product } from '../types/products';
import apiClient from '../api/apiClient';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<Product[]>('/products');
        setProducts(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error?.message : 'Failed to fetch products'
        );
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='max-w-[1152px] mx-auto px-6 py-8'>
      <PageHeading title='Explore Eazy Stickers!'>
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      {error && (
        <div className='flex items-center justify-center min-h-screen'>
          <span className='text-xl text-red-500'>Error: {error}</span>
        </div>
      )}
      {loading && (
        <div className='flex items-center justify-center min-h-screen'>
          <span className='text-xl font-semibold'>Loading products...</span>
        </div>
      )}
      <ProductListings products={products} />
    </div>
  );
}
