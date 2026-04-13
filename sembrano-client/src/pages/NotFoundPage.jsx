const coffeeMeme =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80';

const NotFoundPage = () => {
  return (
    <div className="flex w-full justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-xl rounded-3xl border-2 border-zinc-900 bg-zinc-200 p-4">
          <div className="overflow-hidden rounded-2xl border-2 border-zinc-900 bg-zinc-100">
            <img
              src={coffeeMeme}
              alt="Coffee meme for missing page"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <p className="mt-3 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-3 py-2 text-center text-xs font-semibold text-zinc-700">
            404: Espresso yourself, but this page is not here.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border-2 border-zinc-900 bg-zinc-100 p-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Beans</p>
              <p className="mt-1 text-sm font-bold text-zinc-900">Missing</p>
            </div>
            <div className="rounded-xl border-2 border-zinc-900 bg-zinc-100 p-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Mood</p>
              <p className="mt-1 text-sm font-bold text-zinc-900">Still Cozy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
