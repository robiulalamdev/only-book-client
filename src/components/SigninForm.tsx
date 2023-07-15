'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { loginUser } from '@/redux/features/user/userSlice';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function SigninForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate('/');
    }
  }, [user.email, isLoading]);

  return (
    <div className={cn('w-full ', className)} {...props}>
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
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button type='submit' className='mt-4'>Login with email</Button>
        </div>
      </form>


    </div>
  );
}
