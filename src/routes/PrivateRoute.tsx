import { useAppSelector } from '@/redux/hook';
import { Spinner } from '@material-tailwind/react';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  console.log(user, isLoading)

  if (isLoading === true) {
    return <div className='flex justify-center py-4 w-full'><Spinner className='text-3xl text-center' /></div>
  }

  if (user) {
    return children;
  }
  else if (!user && isLoading === false) {
    return <Navigate to="/signin" state={{ path: pathname }} />;
  }

}
