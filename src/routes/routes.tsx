import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Singin from '@/pages/Signin';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },

    ],
  },
  {
    path: '/signin',
    element: <Singin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
