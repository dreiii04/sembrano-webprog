import { Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const authImageUrl = 'https://i.pinimg.com/1200x/1a/7e/bc/1a7ebcc9382e30030426389a3c386cbb.jpg';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-zinc-300 bg-zinc-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
          <div className="w-full max-w-lg rounded-4xl border-2 border-zinc-900 bg-zinc-100 p-5 shadow-[10px_10px_0_0_rgba(24,24,27,0.25)] sm:p-6">
            <div className="flex items-center gap-3 rounded-2xl border-2 border-zinc-300 bg-zinc-50 p-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-zinc-900">
                <img src={logo} alt="Cat Cafe logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Welcome</p>
                <p className="text-sm font-semibold text-zinc-900">Coffee Cats Member Access</p>
              </div>
            </div>

            <figure className="mt-4 overflow-hidden rounded-2xl border-2 border-zinc-900">
              <img
                src={authImageUrl}
                alt="Coffee cat menu illustration"
                className="h-full w-full object-cover"
              />
            </figure>

            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Sign in or create an account to bookmark your favorite cat-inspired blends and stories.
            </p>
          </div>
        </div>
        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
