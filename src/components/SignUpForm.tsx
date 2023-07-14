'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '@/redux/hook';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
    // dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='w-full'>

      <div className="grid gap-3 w-full">
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          id="password"
          placeholder="your password"
          type="password"
          autoCapitalize="none"
          autoCorrect="off"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Input
          id="password"
          placeholder="confirm password"
          type="password"
          autoCapitalize="none"
          autoCorrect="off"
        />
      </div>
      <Button className='w-full mt-4'>Create Account</Button>

    </form>
  );
}
