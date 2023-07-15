import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.png';
import { SigninForm } from '@/components/SigninForm';

export default function Singin() {
  return (
    <>
      <section className='h-screen flex justify-center items-center bg-slate-100'>

        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 max-w-[450px] border p-4 rounded-xl bg-white">
          <h1 className='text-center font-bold text-2xl'>Sign in</h1>
          <SigninForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className='flex items-center justify-center gap-2'>
            <p className='font-bold'>Are You New User? </p>
            <Link
              to="/signup"
              className='text-blue-600 font-bold'
            >
              Signup
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
