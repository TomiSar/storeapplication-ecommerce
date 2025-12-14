import apiClient from '../api/apiClient';
import type { Product } from '../types';

interface ApiError {
  message?: string;
  status?: number;
}

export const productsLoader = async () => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.message || 'Failed to fetch products. Please try again.',
      { status: err.status || 500 }
    );
  }
};
