const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Home
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Brewing better coffee experiences with clear flavor stories and simple guides
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Welcome to Cat Cafe. This page introduces our beans, brewing approach, and café
              culture in a simple, easy-to-follow format. Each section is organized to help you move
              from discovery to your next cup with confidence.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
            alt="Freshly brewed coffee beside beans and brewing tools"
            className="h-full min-h-72 w-full rounded-3xl border-2 border-zinc-900 object-cover"
          />
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            What We Focus On
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Core values in every cup</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Purpose
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Every roast starts with a clear flavor goal and origin profile.</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Layout
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Each brew method is explained in simple, step-by-step sections.</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Story
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Farmer-to-cup stories connect people to the beans they drink.</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Visuals
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Coffee visuals highlight roast color, texture, and serving style.</p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Work
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Recent highlights from our coffee journal</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80"
              alt="Pour-over setup with scale and coffee dripper"
              className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Pour-Over Brewing Session</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We refined bloom timing, water ratio, and grind consistency for a cleaner cup.
            </p>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
              alt="Barista pouring latte art in a café"
              className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Signature Latte Practice</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Our bar team practiced milk texture and free-pour patterns for smoother service.
            </p>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80"
              alt="Roasted coffee beans in close detail"
              className="aspect-4/3 w-full rounded-[1.25rem] border-2 border-zinc-900 object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Bean Cupping Notes</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We documented aroma, body, and finish to compare new single-origin arrivals.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;