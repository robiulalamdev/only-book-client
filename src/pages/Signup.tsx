import { SignupForm } from '../components/SignUpForm';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <section className='h-screen flex justify-center items-center bg-slate-100'>

        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 max-w-[450px] border p-4 rounded-xl bg-white">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignupForm />
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
              <p className='font-bold'>You Have Already an Account? </p>
              <Link
                to="/signin"
                className='text-blue-600 font-bold'
              >
                Signin
              </Link>
            </div>
          </div>


        </div>
      </section>
    </>
  );
}
