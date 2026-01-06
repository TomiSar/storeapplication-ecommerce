import { apiClient } from '../api/apiClient';
import type { Product, Profile } from '../types';

interface ApiError {
  response?: {
    data?: {
      errorMessage?: string;
    };
  };
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
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch products. Please try again.',
      { status: err.status || 500 },
    );
  }
};

export const profileLoader = async () => {
  try {
    const response = await apiClient.get<Profile>('/profile');
    console.debug('Profile Loader Response:', response);
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch profile. Please try again.',
      { status: err.status || 500 },
    );
  }
};
