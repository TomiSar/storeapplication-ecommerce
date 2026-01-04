import { useRef, useEffect, useState } from 'react';
import { useActionData, useNavigate, useNavigation, useSubmit, Form, Link } from 'react-router-dom';
import PageTitle from './PageTitle';
import type { ActionResult } from '../actions/types';
import { toastError, toastSuccess } from '../utils/toast';

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const [passwordMismatchError, setPasswordMismatchError] = useState<string>('');
  const actionData = useActionData() as
    | ActionResult<
        { message: string },
        {
          name?: string;
          email?: string;
          mobileNumber?: string;
          password?: string;
          message?: string;
        }
      >
    | undefined;

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toastSuccess(
        actionData.message ?? 'Registration completed successfully! Please log in to continue.',
      );
      navigate('/login');
    } else if (actionData.message && !actionData?.success) {
      //   toastError(actionData.message ?? 'Registration failed');
      toastError(actionData.message);
    }
  }, [actionData, navigate]);

  /**  Validate Passwords Match **/
  const validatePasswordsMatch = (formData: FormData): boolean => {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      setPasswordMismatchError('Please ensure both passwords are the same.');
      //   toastError('Passwords do not match');
      return false;
    }
    setPasswordMismatchError('');
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    setPasswordMismatchError('');

    const formData = new FormData(formRef.current);
    if (validatePasswordsMatch(formData)) {
      submit(formData, { method: 'post' });
    }
  };

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="min-h-[752px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
        <PageTitle title="Register" />
        <Form className="space-y-6" method="POST" ref={formRef} onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className={labelStyle} htmlFor="name">
              Name
            </label>
            <input
              className={textFieldStyle}
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              minLength={5}
              maxLength={30}
            />
            {actionData && !actionData.success && actionData.errors?.name && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className={labelStyle} htmlFor="email">
                Email
              </label>
              <input
                className={textFieldStyle}
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
              />
              {actionData && !actionData.success && actionData.errors?.email && (
                <p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>
              )}
            </div>
            {/* Mobile Number */}
            <div>
              <label className={labelStyle} htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                className={textFieldStyle}
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                pattern="^\d{8,10}$"
                title="Mobile number must be between 8 and 10 digits"
                placeholder="Your Mobile Number"
              />
              {actionData && !actionData.success && actionData.errors?.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">{actionData.errors.mobileNumber}</p>
              )}
            </div>
          </div>
          {/* Password */}
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
              minLength={6}
              maxLength={20}
            />
            {actionData && !actionData.success && actionData.errors?.password && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className={labelStyle} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={textFieldStyle}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              autoComplete="confirm-password"
              required
              minLength={6}
              maxLength={20}
            />
            {passwordMismatchError && (
              <p className="text-red-500 text-sm mt-1">{passwordMismatchError}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            className="w-full px-6 py-2 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <Link
            className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
            to="/login"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
