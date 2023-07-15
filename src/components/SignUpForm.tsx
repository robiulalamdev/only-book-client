'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '@/redux/hook';
import { Button, Input } from '@material-tailwind/react';
import { createUser } from '@/redux/features/user/userSlice';

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
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: SignupFormInputs) => {
    dispatch(createUser({ name: data.name, email: data.email, password: data.password }));
  };

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
      <Button type='submit' className='w-full mt-4'>Create Account</Button>

    </form>
  );
}
