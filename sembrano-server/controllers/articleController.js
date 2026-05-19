const Article = require('../models/Articles');

const ARTICLE_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const buildSlug = (value) =>
    String(value ?? '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const toParagraphs = (value) => {
    if (Array.isArray(value)) {
        return value
            .map((paragraph) => String(paragraph ?? '').trim())
            .filter(Boolean);
    }

    return String(value ?? '')
        .split(/\r?\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
};

const randomArticleId = () => {
    let generated = '';
    for (let index = 0; index < 6; index += 1) {
        const randomIndex = Math.floor(Math.random() * ARTICLE_ID_ALPHABET.length);
        generated += ARTICLE_ID_ALPHABET[randomIndex];
    }
    return generated;
};

const getUniqueArticleId = async () => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
        const candidate = randomArticleId();
        const existing = await Article.findOne({ articleId: candidate }).select('_id').lean();
        if (!existing) {
            return candidate;
        }
    }

    return `ART${Date.now().toString(36).toUpperCase().slice(-3).padStart(3, '0')}`;
};

const getArticles = async (_req, res) => {
    try {
        const articles = await Article.find({}).sort({ createdAt: -1 });
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ name: req.params.name, isActive: true });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json({ article });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createArticle = async (req, res) => {
    try {
        const title = String(req.body.title ?? '').trim();
        const slug = buildSlug(req.body.name || title);
        const content = toParagraphs(req.body.content);

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!slug) {
            return res.status(400).json({ message: 'Slug is required' });
        }

        if (!content.length) {
            return res.status(400).json({ message: 'Add at least one paragraph' });
        }

        const article = await Article.create({
            title,
            name: slug,
            articleId: String(req.body.articleId ?? '').trim().toUpperCase() || (await getUniqueArticleId()),
            content,
            isActive: req.body.isActive === false ? false : true,
        });

        res.status(201).json({ article });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const existing = await Article.findById(req.params.id);

        if (!existing) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const nextTitle =
            req.body.title === undefined ? existing.title : String(req.body.title ?? '').trim();
        const nextSlug =
            req.body.name === undefined && req.body.title === undefined
                ? existing.name
                : buildSlug(req.body.name || nextTitle);
        const nextContent =
            req.body.content === undefined ? existing.content : toParagraphs(req.body.content);

        if (!nextTitle) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!nextSlug) {
            return res.status(400).json({ message: 'Slug is required' });
        }

        if (!nextContent.length) {
            return res.status(400).json({ message: 'Add at least one paragraph' });
        }

        const article = await Article.findByIdAndUpdate(
            req.params.id,
            {
                title: nextTitle,
                name: nextSlug,
                content: nextContent,
                isActive: req.body.isActive === undefined ? existing.isActive : Boolean(req.body.isActive),
            },
            { new: true, runValidators: true }
        );

        res.json({ article });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
};
