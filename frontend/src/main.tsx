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
import ProductDetail from './components/ProductDetail.tsx';
import { productsLoader } from './loaders/index.ts';
import { contactAction } from './actions/index.ts';
import { ToastContainer, Bounce } from 'react-toastify';
import { CartProvider } from './store/cartContext.tsx';
import 'react-toastify/dist/ReactToastify.css';

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    {/* index route */}
    <Route element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/product/:productId" element={<ProductDetail />} />
  </Route>,
);

const router = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
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
