// import { useRevalidator } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import type { AdminMessage, Order, Product, Profile } from '../types';
import type { Contact } from '../types/contact';
// import { toastError, toastSuccess } from '../utils/toast';

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

export const orderLoader = async () => {
  try {
    const response = await apiClient.get<Order[]>('/orders');
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch orders. Please try again.',
      { status: err.status || 500 },
    );
  }
};

export const adminOrderLoader = async () => {
  try {
    const response = await apiClient.get<Order[]>('/admin/orders');
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch orders. Please try again.',
      { status: err.status || 500 },
    );
  }
};

export const messagesLoader = async () => {
  try {
    const response = await apiClient.get<AdminMessage>('/admin/messages');
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch orders. Please try again.',
      { status: err.status || 500 },
    );
  }
};

export const contactInfoLoader = async () => {
  try {
    const response = await apiClient.get<Contact[]>('/contacts/info');
    return response.data;
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.response?.data?.errorMessage ||
        err.message ||
        'Failed to fetch contact info. Please try again.',
      { status: err.status || 500 },
    );
  }
};
