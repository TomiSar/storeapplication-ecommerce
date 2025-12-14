import apiClient from '../api/apiClient';
import { type ActionFunctionArgs } from 'react-router-dom'; //redirect,

interface ContactFormData {
  name: string;
  email: string;
  mobileNumber: string;
  message: string;
}

interface ApiError {
  message?: string;
  status?: number;
}

export async function contactAction({ request, params }: ActionFunctionArgs) {
  const data = await request.formData();

  const contactData: ContactFormData = {
    name: data.get('name')?.toString() || '',
    email: data.get('email')?.toString() || '',
    mobileNumber: data.get('mobileNumber')?.toString() || '',
    message: data.get('message')?.toString() || '',
  };
  try {
    await apiClient.post('/contacts', contactData);
    return {
      success: true,
    };
    // return redirect('/home');
  } catch (error) {
    const err = error as ApiError;
    throw new Response(
      err.message || 'Failed to submit your message. Please try again.',
      { status: err.status || 500 }
    );
  }
}
