import { useActionData, useNavigation, useSubmit } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Form } from 'react-router-dom';
import PageTitle from './PageTitle';
import { toast } from 'react-toastify';

type ContactActionData =
  | {
      success: boolean;
    }
  | undefined;

export default function Contact() {
  const actionData = useActionData() as ContactActionData;
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success('Your message has been submitted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [actionData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userConfirmed = window.confirm(
      'Are you sure you want to submit the form?'
    );

    if (userConfirmed) {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        console.log('Submit data!!');
        console.log(formData);
        submit(formData, { method: 'post' });
      }
    } else {
      toast.info('Form submission cancelled.');
    }
  };

  const labelStyle =
    'block text-lg font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';
  return (
    <div className='max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg'>
      <PageTitle title='Contact Us' />
      <p className='max-w-[768px] mx-auto mt-8 text-gray-600 dark:text-lighter mb-8 text-center'>
        We’d love to hear from you! If you have any questions, feedback, or
        suggestions, please don’t hesitate to reach out.
      </p>

      {/* Contact Form */}
      <Form
        className='space-y-6 max-w-[768px] mx-auto'
        method='POST'
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label htmlFor='name' className={labelStyle}>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Your Name'
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Email */}
          <div>
            <label htmlFor='email' className={labelStyle}>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Your Email'
              className={textFieldStyle}
              required
            />
          </div>
          {/* Mobile Number */}
          <div>
            <label htmlFor='mobileNumber' className={labelStyle}>
              Mobile Number
            </label>
            <input
              id='mobileNumber'
              name='mobileNumber'
              type='tel'
              required
              pattern='^\d{10}$'
              title='Mobile number must be exactly 10 digits'
              placeholder='Your Mobile Number'
              className={textFieldStyle}
            />
          </div>
        </div>
        {/* Message */}
        <div>
          <label htmlFor='message' className={labelStyle}>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            placeholder='Your Message'
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={500}
          ></textarea>
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='px-6 py-2 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </div>
  );
}
