import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Singin from '@/pages/Signin';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import AddBook from '@/pages/AddBook';

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
        path: "/home",
        element: <Home />,
      },
      {
        path: '/all-books',
        element: <Books />,
      },
      {
        path: '/books/:id',
        element: <ProductDetails />,
      },
      {
        path: '/add-book',
        element: <AddBook />,
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
