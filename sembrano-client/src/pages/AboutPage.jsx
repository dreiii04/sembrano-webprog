const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <img
                        src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80"
                        alt="Baristas preparing coffee in a warm café"
                        className="h-full min-h-72 w-full rounded-3xl border-2 border-zinc-900 object-cover"
                    />
 
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            About
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            We are a coffee-focused team serving practical brewing guidance and café experiences.
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Cat Cafe began as a small campus coffee project and grew into a shared space
                            for brewing education and community. We combine sourcing knowledge, clear tutorials,
                            and approachable storytelling so every visitor can enjoy better coffee at home.
                        </p>
                    </div>
                </div>
            </section>
 
 
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Team Snapshot
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">How we work from bean to cup</h2>
                </div>
 
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">05</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Team Members
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">Roasters, baristas, and brewers working as one team.</p>
                    </div>
 
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">16+</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Seasonal Coffee Releases
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">New roast profiles introduced throughout the year.</p>
                    </div>
 
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">09</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Farm Partners
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">Trusted producers supplying quality beans and traceable lots.</p>
                    </div>
 
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">03</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Main Services
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">Coffee roasting, brewing workshops, and café service.</p>
                    </div>
                </div>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Process
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Our step-by-step coffee workflow</h2>
 
                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">1. Source</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    We select green beans based on origin, harvest quality, and flavor potential.
                                </p>
                            </article>
 
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">2. Roast</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    We develop roast curves that balance sweetness, acidity, and body.
                                </p>
                            </article>
 
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">3. Brew & Serve</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    We dial in recipes and serve cups that stay consistent from first pour to last.
                                </p>
                            </article>
                        </div>
                    </div>
 
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Coffee Gallery
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <img
                                src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=700&q=80"
                                alt="Coffee beans and espresso setup"
                                className="aspect-square w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=700&q=80"
                                alt="Pour-over coffee being prepared"
                                className="aspect-square w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=700&q=80"
                                alt="Barista steaming milk for latte"
                                className="aspect-square w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
                                alt="Cup of coffee on a wooden table"
                                className="aspect-square w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
 
export default AboutPage;
 