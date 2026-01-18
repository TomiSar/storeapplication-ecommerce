import { useRef, useEffect, useState } from 'react';
import { useActionData, useNavigate, useNavigation, useSubmit, Form, Link } from 'react-router-dom';
import type { RegisterResult } from '../actions/types';
import { toastError, toastSuccess } from '../utils/toast';
import FieldError from './form/FieldError';
import PageTitle from './PageTitle';

export default function Register() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const [passwordMismatchError, setPasswordMismatchError] = useState<string>('');
  const actionData = useActionData() as RegisterResult | undefined;

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

  /**  Validate Password Match **/
  const validatePasswordsMatch = (formData: FormData): boolean => {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      setPasswordMismatchError('Please ensure both passwords are the same.');
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
          <div>
            <label className={labelStyle} htmlFor="name">
              Name
            </label>
            <input
              className={textFieldStyle}
              id="name"
              data-testid="register-name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              minLength={4}
              maxLength={30}
            />
            <FieldError actionData={actionData} field="name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle} htmlFor="email">
                Email
              </label>
              <input
                className={textFieldStyle}
                id="email"
                data-testid="register-email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
              />
              <FieldError actionData={actionData} field="email" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                className={textFieldStyle}
                id="mobileNumber"
                data-testid="register-mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                pattern="^\d{8,10}$"
                title="Mobile number must be between 8 and 10 digits"
                placeholder="Your Mobile Number"
              />
              <FieldError actionData={actionData} field="mobileNumber" />
            </div>
          </div>
          <div>
            <label className={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              className={textFieldStyle}
              id="password"
              data-testid="register-password"
              name="password"
              type="password"
              placeholder="Your Password"
              autoComplete="password"
              required
              minLength={8}
              maxLength={20}
            />
            <FieldError actionData={actionData} field="password" />
          </div>
          <div>
            <label className={labelStyle} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={textFieldStyle}
              id="confirmPassword"
              data-testid="register-confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              autoComplete="confirm-password"
              required
              minLength={8}
              maxLength={20}
            />
            {passwordMismatchError && (
              <p className="text-red-500 text-sm mt-1">{passwordMismatchError}</p>
            )}
          </div>
          <button
            className="w-full px-6 py-2 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
            type="submit"
            disabled={isSubmitting}
            data-testid="register-submit"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
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
