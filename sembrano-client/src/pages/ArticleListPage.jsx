const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Articles
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Stories and guides from our coffee journey
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                    These writeups share practical coffee lessons from sourcing to brewing.
                    From choosing beans to dialing in recipes, each article offers clear steps
                    you can apply in your own kitchen or café.
                </p>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Latest coffee reads</h2>
                </div>
 
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80"
                            alt="Coffee beans in a bag with notes"
                            className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                        />
 
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 01
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">How to choose coffee beans</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Learn how roast level, origin, and processing affect flavor in your daily cup.
                        </p>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src="https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=900&q=80"
                            alt="Pour-over coffee being brewed"
                            className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                        />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 02
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Brewing pour-over at home</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Practical grind size, bloom, and pour timing tips for balanced extraction.
                        </p>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src="https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=900&q=80"
                            alt="Espresso shot pouring from machine"
                            className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                        />
 
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 03
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Espresso basics for beginners</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Discover dose, yield, and timing targets that improve espresso consistency.
                        </p>
                    </article>
 
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"
                            alt="Latte art in a ceramic cup"
                            className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
                        />
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 04
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Milk steaming and latte art</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Turn textured milk into simple tulips and hearts with repeatable pitcher control.
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
};
 
export default ArticlePage; 