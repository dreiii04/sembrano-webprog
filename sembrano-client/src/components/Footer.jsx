const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t-2 border-zinc-900 bg-zinc-100 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl border-t-2 border-zinc-900 pt-5">
                <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {currentYear} Cat Cafe. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-zinc-900 transition">Instagram</a>
                        <a href="#" className="hover:text-zinc-900 transition">Facebook</a>
                        <a href="#" className="hover:text-zinc-900 transition">TikTok</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;