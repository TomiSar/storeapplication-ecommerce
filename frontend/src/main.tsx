import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import ProductDetail from './components/ProductDetail';
import CheckoutForm from './components/CheckoutForm';
import Profile from './components/Profile';
import Orders from './components/Orders';
import AdminOrders from './components/admin/AdminOrders';
import Messages from './components/admin/Messages';
import ProtectedRoute from './components/ProtectedRoute';
import { productsLoader } from './loaders/index.ts';
import { contactAction, loginAction } from './actions/index';
import { ToastContainer, Bounce } from 'react-toastify';
import { CartProvider } from './store/cartContext';
import { AuthProvider } from './store/authContext';
import 'react-toastify/dist/ReactToastify.css';

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/messages" element={<Messages />} />
    </Route>
  </Route>,
);

const router = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>,
);
