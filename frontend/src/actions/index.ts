import { apiClient } from '../api/apiClient';
import { type ActionFunctionArgs } from 'react-router-dom';
import { mapApiError } from './errorUtils';
import type {
  ContactErrors,
  ContactFormData,
  LoginErrors,
  LoginFormData,
  LoginSuccess,
  ProfileFormData,
  RegisterSuccess,
  RegisterErrors,
  RegisterFormData,
  ContactResult,
  LoginResult,
  RegisterResult,
  ProfileResult,
  ProfileSuccess,
  ProfileErrors,
} from './types';

/* ---------- CONTACT ACTION ---------- */
export async function contactAction({ request }: ActionFunctionArgs): Promise<ContactResult> {
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

/* ---------- LOGIN ACTION ---------- */
export async function loginAction({ request }: ActionFunctionArgs): Promise<LoginResult> {
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

/* ---------- REGISTER ACTION ---------- */
export async function registerAction({ request }: ActionFunctionArgs): Promise<RegisterResult> {
  const data = await request.formData();

  const registerData: RegisterFormData = {
    name: String(data.get('name') ?? ''),
    email: String(data.get('email') ?? ''),
    mobileNumber: String(data.get('mobileNumber') ?? ''),
    password: String(data.get('password') ?? ''),
  };

  try {
    const response = await apiClient.post('/auth/register', registerData);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return mapApiError<RegisterSuccess, RegisterErrors>(error, 'Registration failed');
  }
}

/* ---------- PROFILE ACTION ---------- */
export async function profileAction({ request }: ActionFunctionArgs): Promise<ProfileResult> {
  const data = await request.formData();

  const profileData: ProfileFormData = {
    name: String(data.get('name') ?? ''),
    email: String(data.get('email') ?? ''),
    mobileNumber: String(data.get('mobileNumber') ?? ''),
    street: String(data.get('street') ?? ''),
    city: String(data.get('city') ?? ''),
    state: String(data.get('state') ?? ''),
    postalCode: String(data.get('postalCode') ?? ''),
    country: String(data.get('country') ?? ''),
  };
  try {
    const response = await apiClient.put('/profile', profileData);
    return {
      success: true,
      profileData: response.data,
      message: response.data.message,
    };
  } catch (error) {
    return mapApiError<ProfileSuccess, ProfileErrors>(error, 'Failed to update profile');
  }
}
