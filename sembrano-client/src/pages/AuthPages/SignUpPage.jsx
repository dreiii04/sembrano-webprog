import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/images/logo.jpg';

const authImageUrl = 'https://i.pinimg.com/1200x/1a/7e/bc/1a7ebcc9382e30030426389a3c386cbb.jpg';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  return (
    <>
  
      <div className="mb-2 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-zinc-900">
          <img src={logo} alt="Cat Cafe logo" className="h-full w-full object-cover" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Create Account</p>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account with the same monochrome layout pattern and shared button treatment.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
