import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import type { PaymentMethodCreateParams } from '@stripe/stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/cartContext';
import { toastSuccess } from '../utils/toast';
import PageTitle from './PageTitle';

export default function CheckoutForm() {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [elementErrors, setElementErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const isDarkMode = localStorage.getItem('theme') === 'dark';

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const fieldBaseClass =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';
  const fieldErrorClass = 'border-red-400 dark:border-red-500 focus:ring-red-500';
  const fieldValidClass =
    'border-primary dark:border-light focus:ring-dark dark:focus:ring-lighter';

  const getClassForElement = (field: keyof typeof elementErrors) =>
    `${fieldBaseClass} ${elementErrors[field] ? fieldErrorClass : fieldValidClass}`;

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: isDarkMode ? '#E5E7EB' : '#374151',
        backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
      },
      invalid: {
        color: '#F87171',
        backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
      },
    },
  };

  function handleCardChange(field: keyof typeof elementErrors, event: any) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : '',
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe.js is not loaded yet.');
      return;
    }

    if (!user) {
      setErrorMessage('User information is not available.');
      return;
    }

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage('Please correct the highlighted errors.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await apiClient.post('/payment/create-payment-intent', {
        amount: totalPrice * 100,
        currency: 'usd',
      });

      const { clientSecret } = response.data;

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setErrorMessage('Card element not found.');
        setIsProcessing(false);
        return;
      }

      const billingDetails: PaymentMethodCreateParams.BillingDetails = {
        name: user.name as string | undefined,
        email: user.email as string | undefined,
        phone: user.mobileNumber as string | undefined,
        address: {
          line1: user.street as string | undefined,
          city: user.city as string | undefined,
          state: user.state as string | undefined,
          postal_code: user.postalCode as string | undefined,
          country: user.country as string | undefined,
        },
      };

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toastSuccess('Payment successful!');
        navigate('/order-success');

        /* Commented out order creation for now. Stripe transaction tested only for now */
        // try {
        //   await apiClient.post('/orders', {
        //     totalPrice: totalPrice,
        //     paymentId: paymentIntent.id,
        //     paymentStatus: paymentIntent.status,
        //     items: cart.map((item) => ({
        //       productId: item.productId,
        //       quantity: item.quantity,
        //       price: item.price,
        //     })),
        //   });
        //   sessionStorage.setItem('skipRedirectPath', 'true');
        //   clearCart();
        //   navigate('/order-success');
        // } catch (orderError) {
        //   console.error('Failed to create order:', orderError);
        //   setErrorMessage('Order creation failed. Please contact support.');
        // }
      }
    } catch (error) {
      setErrorMessage('Error processing payment. Please try again later.');
      console.error('Error creating PaymentIntent:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div
        className={
          isProcessing ? 'visible  flex flex-col justify-center items-center my-[200px] ' : 'hidden'
        }
      >
        <p className="mt-4 text-2xl font-normal text-primary dark:text-light">
          Processing Payment.... Do not refresh the page
        </p>
      </div>
      <div
        className={
          isProcessing
            ? 'hidden'
            : 'visible bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6'
        }
      >
        <PageTitle title="Complete Your Payment" />
        <p className="text-center mt-8 text-lg text-gray-600 dark:text-lighter mb-8">
          Amount to be charged: <strong>{totalPrice.toFixed(2)}$</strong>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
          {/* Card Number */}
          <div>
            <label className={labelStyle} htmlFor="cardNumber">
              Card Number
            </label>
            <div className={getClassForElement('cardNumber')} id="cardNumber">
              <CardNumberElement
                options={elementOptions}
                onChange={(event) => handleCardChange('cardNumber', event)}
              />
            </div>
            {elementErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{elementErrors.cardNumber}</p>
            )}
          </div>
          {/* Card Expiry */}
          <div>
            <label htmlFor="cardExpiry" className={labelStyle}>
              Expiry Date
            </label>
            <div className={getClassForElement('cardExpiry')} id="cardExpiry">
              <CardExpiryElement
                options={elementOptions}
                onChange={(event) => handleCardChange('cardExpiry', event)}
              />
            </div>
            {elementErrors.cardExpiry && (
              <p className="text-red-500 text-sm mt-1">{elementErrors.cardExpiry}</p>
            )}
          </div>

          {/* Card CVC */}
          <div>
            <label htmlFor="cardCvc" className={labelStyle}>
              CVC
            </label>
            <div className={getClassForElement('cardCvc')} id="cardCvc">
              <CardCvcElement
                options={elementOptions}
                onChange={(event) => handleCardChange('cardCvc', event)}
              />
            </div>
            {elementErrors.cardCvc && (
              <p className="text-red-500 text-sm mt-1">{elementErrors.cardCvc}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full px-6 py-2 mt-6 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
            >
              {isProcessing ? 'Payment processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
