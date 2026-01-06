import { useEffect, useRef } from 'react';
import { useActionData, useNavigation, useSubmit, Form } from 'react-router-dom';
import type { ContactResult } from '../actions/types';
import { toastInfo, toastSuccess } from '../utils/toast';
import FieldError from './form/FieldError';
import PageTitle from './PageTitle';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData() as ContactResult | undefined;
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
    <div className="max-w-6xl min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="Contact Us" />
      <p className="max-w-3xl mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center">
        We’d love to hear from you! If you have any questions, feedback, or suggestions, please
        don’t hesitate to reach out.
      </p>
      <Form
        className="space-y-6 max-w-3xl mx-auto"
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
            minLength={3}
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
          <FieldError actionData={actionData} field="message" />
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
