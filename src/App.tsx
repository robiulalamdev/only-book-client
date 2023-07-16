import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { getUserInfo } from './redux/features/user/userSlice';

function App() {
  const token: string | null = localStorage.getItem("only-book-token")
  console.log(token)
  const dispatch = useAppDispatch();

  dispatch(getUserInfo(token))

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
