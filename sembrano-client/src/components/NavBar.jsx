import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
 
const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Article', to: '/articles' },
];
 
const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wide leading-none transition active:bg-zinc-900 active:text-zinc-50',
        isActive
            ? 'bg-zinc-900 text-zinc-50'
            : 'text-zinc-900 hover:bg-zinc-200',
    ].join(' ');
 
const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-2xl border-2 border-zinc-900 bg-zinc-100 px-3 py-2">
                <NavLink to="/" className="shrink-0">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-100">
                        <img
                            src={logo}
                            alt="Cat Cafe logo"
                            className="h-full w-full scale-110 object-cover"
                        />
                    </div>
                </NavLink>
 
                <nav className="flex flex-1 flex-wrap items-center gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/'}
                            className={navLinkClassName}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <form className="ml-auto flex items-center gap-2">
                    <input
                        type="search"
                        placeholder="Search coffee"
                        aria-label="Search coffee"
                        className="w-32 rounded-full border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:bg-white sm:w-40"
                    />
                    <button
                        type="submit"
                        className="rounded-full border-2 border-zinc-900 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-50 transition hover:bg-zinc-700"
                    >
                        Go
                    </button>
                </form>
            </div>
        </header>
    );
};
 
export default NavBar;