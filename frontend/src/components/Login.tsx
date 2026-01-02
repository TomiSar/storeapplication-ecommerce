import { useEffect } from 'react';
import { Link, Form, useNavigate, useNavigation, useActionData } from 'react-router-dom';
import PageTitle from './PageTitle';
import { toast } from 'react-toastify';
import type { ActionResult } from '../actions/types';

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData() as
    | ActionResult<{ message: string; user: unknown; jwtToken: string }, { message?: string }>
    | undefined;

  useEffect(() => {
    if (!actionData) return;

    if (actionData?.success) {
      navigate('/home');
      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error(actionData.message ?? 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [actionData, navigate]);

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';

  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        {/* Title */}
        <PageTitle title="Login" />
        {/* Form */}
        <Form className="space-y-6" method="POST">
          {/* Email Field */}
          <div>
            <label className={labelStyle} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              autoComplete="username"
              required
              className={textFieldStyle}
            />
          </div>
          {/* Password Field */}
          <div>
            <label className={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              className={textFieldStyle}
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              autoComplete="current-password"
              required
              minLength={8}
              maxLength={20}
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              className="w-full px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </Form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link
            className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
            to="/register"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
