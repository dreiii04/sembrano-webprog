import { useEffect, useState } from 'react';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const { data } = await fetchArticles();
                const rows = Array.isArray(data?.articles) ? data.articles : [];
                setArticles(rows.filter((article) => article?.isActive !== false));
            } catch (error) {
                console.error('Unable to load articles:', error);
                setArticles([]);
            }
        };

        loadArticles();
    }, []);

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
                    you can apply in your own kitchen or cafe.
                </p>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Latest coffee reads</h2>
                </div>

                <ArticleList articles={articles} />
            </section>
        </div>
    );
};

export default ArticleListPage;