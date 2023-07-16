'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Spinner } from '@material-tailwind/react';
import { usePostCreateUserMutation } from '@/redux/features/user/userApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const navgate = useNavigate()

  const [postCreateUser, { isLoading, isError, isSuccess, error }] = usePostCreateUserMutation();

  const onSubmit = (data: SignupFormInputs) => {
    const options = {
      data: { name: data.name, email: data.email, password: data.password },
    };
    postCreateUser(options);
  };


  if (isSuccess) {
    toast.success('New User Created Successful!', {
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
    navgate("/signin")
  } else if (isError) {
    toast.error('New User Created unsuccessful!', {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='w-full'>

      <div className="grid gap-3 w-full">

        <Input
          id="name"
          type="text"
          label='Name'
          error={errors.name ? true : false}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          id="email"
          type="email"
          label='Email'
          error={errors.email ? true : false}
          {...register('email', { required: 'Email is required' })}
        />

        <Input
          id="password"
          type="password"
          label='Password'
          error={errors.password ? true : false}
          {...register('password', { required: 'Password is required' })}
        />
        <Input
          id="password"
          type="password"
          label='Confirm Password'
          error={errors.password ? true : false}
          {...register('confirm_password', { required: 'Confirm Password is required' })}
        />
      </div>
      <Button disabled={isLoading} type='submit' className='w-full mt-4'>
        {
          isLoading ? <div className='flex justify-center items-center gap-2'>
            <Spinner />
            <span>Create Account</span>
          </div> : "Create Account"
        }
      </Button>

    </form>
  );
}
