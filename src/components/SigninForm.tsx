'use client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { usePostLoginUserMutation } from '@/redux/features/user/userApiSlice';

interface LoginFormInputs {
  email: string;
  password: string;
}

export function SigninForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // const { user } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const [postLoginUser, { isLoading, isError, error, data: result }] = usePostLoginUserMutation();
  const errorResult: any = error

  const onSubmit = async (data: LoginFormInputs) => {
    const options = {
      data: { email: data.email, password: data.password },
    };
    const loginResult: any = await postLoginUser(options);

    if (loginResult?.data?.success) {
      localStorage.setItem("only-book-token", loginResult?.data?.data?.accessToken)
      toast.success('User logged in successfully', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      reset()
      navigate("/")
    }
  };


  if (isError && error) {
    toast.error(`${errorResult?.data?.message}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }


  // useEffect(() => {
  //   if (user.email && !isLoading) {
  //     navigate('/');
  //   }
  // }, [user.email, isLoading]);

  console.log(result)

  return (
    <div className={`w-full `}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              error={errors.email ? true : false}
              {...register('email', { required: 'Email is required' })}
            />
            {/* {errors.email && <p>{errors.email.message}</p>} */}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              error={errors.password ? true : false}
              {...register('password', { required: 'Password is required' })}
            />
          </div>
          <Button disabled={isLoading} type='submit' className='mt-4'>
            {
              isLoading ? <div className='flex justify-center items-center gap-2'>
                <Spinner />
                <span>Login with email</span>
              </div> : "Login with email"
            }
          </Button>
        </div>
      </form>


    </div>
  );
}
