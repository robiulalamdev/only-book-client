import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { useEffect } from 'react';
import { useGetUserInfoMutation } from './redux/features/user/userApiSlice';
import { setLoading, setUser } from './redux/features/user/userSlice';

function App() {
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

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
