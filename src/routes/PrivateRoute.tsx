import { useGetUserInfoMutation } from '@/redux/features/user/userApiSlice';
import { setLoading, setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  let iLoading = true

  const token: string | null = localStorage.getItem("only-book-token")
  const [getUserInfo, { }] = useGetUserInfoMutation()
  const dispatch = useAppDispatch();

  const getUserData = async (token: string | any) => {
    dispatch(setLoading(true))
    const options = {
      token: token
    }
    const result: any = await getUserInfo(options)
    dispatch(setUser(result?.data?.data))
    dispatch(setLoading(false))
  }

  useEffect(() => {
    getUserData(token)
  }, [])

  if (isLoading && iLoading) {
    return <p>Loading...</p>;
  }

  if (!user?._id && !isLoading) {
    return <Navigate to="/signin" state={{ path: pathname }} />;
  } if (user?._id && !isLoading) {
    return children;
  }

}
