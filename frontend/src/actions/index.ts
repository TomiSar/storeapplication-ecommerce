import apiClient from '../api/apiClient';
import { type ActionFunctionArgs } from 'react-router-dom';
import { mapApiError } from './errorUtils';
import type { ActionResult } from './types';

/* ---------- CONTACT ---------- */
export interface ContactErrors {
  name?: string;
  email?: string;
  mobileNumber?: string;
  message?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  mobileNumber: string;
  message: string;
}

export async function contactAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult<void, ContactErrors>> {
  const data = await request.formData();

  const contactData: ContactFormData = {
    name: String(data.get('name') ?? ''),
    email: String(data.get('email') ?? ''),
    mobileNumber: String(data.get('mobileNumber') ?? ''),
    message: String(data.get('message') ?? ''),
  };

  try {
    await apiClient.post('/contacts', contactData);
    return { success: true };
  } catch (error) {
    return mapApiError<void, ContactErrors>(error, 'Failed to submit contact form');
  }
}

/* ---------- LOGIN ---------- */
interface LoginSuccess {
  message: string;
  user: unknown;
  jwtToken: string;
}

interface LoginErrors {
  message?: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

export async function loginAction({
  request,
}: ActionFunctionArgs): Promise<ActionResult<LoginSuccess, LoginErrors>> {
  const data = await request.formData();

  const loginData: LoginFormData = {
    username: String(data.get('username') || ''),
    password: String(data.get('password') || ''),
  };

  try {
    const response = await apiClient.post('/auth/login', loginData);
    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
      jwtToken: response.data.jwtToken,
    };
  } catch (error) {
    return mapApiError<LoginSuccess, LoginErrors>(error, 'Invalid username or password');
  }
}
