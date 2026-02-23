import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import { contactAction, loginAction, profileAction, registerAction } from './actions/index';
import App from './App';
import './index.css';
import About from './components/About';
import AdminOrders from './components/admin/AdminOrders';
import Messages from './components/admin/Messages';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders';
import OrderSuccess from './components/OrderSuccess';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import {
  adminOrderLoader,
  contactInfoLoader,
  messagesLoader,
  orderLoader,
  productsLoader,
  profileLoader,
} from './loaders/index';
import { AuthProvider } from './store/authContext';
import { CartProvider } from './store/cartContext';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route
      path="/contact"
      element={<Contact />}
      action={contactAction}
      loader={contactInfoLoader}
    />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => !actionResult?.success}
      />
      <Route path="/orders" element={<Orders />} loader={orderLoader} />
      <Route path="/admin/orders" element={<AdminOrders />} loader={adminOrderLoader} />
      <Route path="/admin/messages" element={<Messages />} loader={messagesLoader} />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>,
);
