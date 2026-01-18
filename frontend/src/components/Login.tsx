import { useEffect } from 'react';
import { useNavigate, useNavigation, useActionData, Link, Form } from 'react-router-dom';
import type { LoginResult } from '../actions/types';
import { useAuth } from '../contexts/authContext';
import { toastError, toastSuccess } from '../utils/toast';
import PageTitle from './PageTitle';

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { loginSuccess } = useAuth();
  const from = sessionStorage.getItem('redirectPath') || '/home';
  const actionData = useActionData() as LoginResult | undefined;

  useEffect(() => {
    if (!actionData) return;

    if (actionData?.success) {
      toastSuccess('Login successful');
      loginSuccess(actionData.jwtToken, actionData.user as Record<string, string>);
      sessionStorage.removeItem('redirectPath');
      navigate(from);
    } else {
      toastError(actionData.message ?? 'Login failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, navigate]);

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        <PageTitle title="Login" />
        <Form className="space-y-6" method="POST">
          <div>
            <label className={labelStyle} htmlFor="username">
              Username
            </label>
            <input
              className={textFieldStyle}
              id="username"
              name="username"
              type="text"
              placeholder="Your Username"
              autoComplete="username"
              required
              data-testid="login-username-input"
            />
          </div>
          <div>
            <label className={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              className={textFieldStyle}
              id="password"
              name="password"
              type="password"
              placeholder="Your Password"
              autoComplete="password"
              required
              minLength={8}
              maxLength={20}
              data-testid="login-password-input"
            />
          </div>
          <div>
            <button
              className="w-full px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
              id="loginButton"
              type="submit"
              disabled={isSubmitting}
              data-testid="login-submit"
            >
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </Form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don not have an account?{' '}
          <Link
            to="/register"
            className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
            data-testid="register-link"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
