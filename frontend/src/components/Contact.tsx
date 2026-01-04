import { useEffect, useRef } from 'react';
import { useActionData, useNavigation, useSubmit, Form } from 'react-router-dom';
import PageTitle from './PageTitle';
import type { ActionResult } from '../actions/types';
import { toastInfo, toastSuccess } from '../utils/toast';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData() as
    | ActionResult<
        void,
        {
          name?: string;
          email?: string;
          mobileNumber?: string;
          message?: string;
        }
      >
    | undefined;

  useEffect(() => {
    if (!actionData) return;

    if (actionData?.success) {
      formRef.current?.reset();
      toastSuccess('Your message has been submitted successfully!');
    }
  }, [actionData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userConfirmed = window.confirm('Are you sure you want to submit the form?');

    if (userConfirmed) {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        submit(formData, { method: 'post' });
      }
    } else {
      toastInfo('Form submission cancelled.');
    }
  };

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="Contact Us" />
      <p className="max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        We’d love to hear from you! If you have any questions, feedback, or suggestions, please
        don’t hesitate to reach out.
      </p>
      {/* Contact Form */}
      <Form
        className="space-y-6 max-w-[768px] mx-auto"
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
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
        {/* Message */}
        <div>
          <label className={labelStyle} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={500}
          ></textarea>
          {actionData && !actionData.success && actionData.errors?.message && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            className="px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </div>
  );
}
