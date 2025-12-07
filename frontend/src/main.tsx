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

const routeDefinitions = createRoutesFromElements(
  <Route path='/' element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/login' element={<Login />} />
    <Route path='/cart' element={<Cart />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: '/home',
//         element: <Home />,
//       },
//       {
//         path: 'about',
//         element: <About />,
//       },
//       {
//         path: 'contact',
//         element: <Contact />,
//       },
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'cart',
//         element: <Cart />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
