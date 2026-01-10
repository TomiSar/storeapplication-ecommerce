import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import emptyCartImage from '../assets/util/emptycart.png';
import { useAuth } from '../contexts/authContext';
import { useCart } from '../contexts/cartContext';
import type { Address } from '../types';
import CartTable from './CartTable';
import PageTitle from './PageTitle';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user || !user.address) return true;
    const { street, city, state, postalCode, country } = (user?.address as Address) || {};
    return !street || !city || !state || !postalCode || !country;
  }, [user, isAuthenticated]);

  // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            {isAddressIncomplete && (
              <p className="text-red-500 text-sm mt-1 text-center">
                Please complete your address details in your profile before proceeding to checkout.
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
                to="/home"
              >
                Back to Products
              </Link>
              {/* Clear Cart Button */}
              <button
                className="py-2 px-4 bg-red-500 dark:bg-red-500 text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-red-600 dark:hover:bg-red-600 transition"
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
              {/* Proceed to Checkout Button */}
              <Link
                className={`py-2 px-4 text-xl font-semibold rounded-sm flex justify-center items-center transition
                                    ${
                                      isAddressIncomplete
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter'
                                    } text-white dark:text-black`}
                to={isAddressIncomplete ? '/#' : '/checkout'}
                onClick={(e) => {
                  if (isAddressIncomplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-xl px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              to="/home"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
