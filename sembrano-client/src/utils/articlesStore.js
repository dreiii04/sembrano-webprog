

const STORAGE_KEY = 'sembrano-articles';

// Keep slugs URL-safe so dashboard edits show on public article routes.
const normalizeSlug = (value) => {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const normalizeStatus = (value) => {
  return value === false ? false : true;
};

const normalizeArticleId = (value, fallbackSlug, index) => {
  const cleaned = String(value ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);

  if (cleaned) {
    return cleaned;
  }

  const fallback = String(fallbackSlug ?? '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6);

  return fallback || `ART${String(index + 1).padStart(3, '0')}`;
};

const ARTICLE_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const sanitizeContent = (content) => {
  if (Array.isArray(content) && content.length) {
    return content.map((paragraph) => String(paragraph ?? '').trim()).filter(Boolean);
  }
  return [];
};

const readStoredArticles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
};

const normalizeArticles = (articles) =>
  articles.map((article, index) => {
    const title = String(article.title ?? '').trim() || `Untitled ${index + 1}`;
    const slugSource = article.name || title;
    const slug = normalizeSlug(slugSource) || `article-${index + 1}`;
    const content = sanitizeContent(article.content);

    return {
      id: slug,
      name: slug,
      articleId: normalizeArticleId(article.articleId, slug, index),
      title,
      content: content.length ? content : [''],
      isActive: normalizeStatus(article.isActive),
    };
  });

export const getArticles = () => {
  const stored = readStoredArticles();
  if (!stored || !stored.length) {
    return [];
  }

  return normalizeArticles(stored);
};

// Persist only the fields the public pages need.
export const saveArticles = (articles) => {
  const payload = articles.map(({ title, name, content, articleId, isActive }) => ({
    title: String(title ?? '').trim(),
    name: normalizeSlug(name ?? title),
    articleId: normalizeArticleId(articleId, name ?? title, 0),
    content: sanitizeContent(content),
    isActive: normalizeStatus(isActive),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const buildSlug = (value) => normalizeSlug(value);

export const generateArticleId = (articles = []) => {
  const existing = new Set(
    (articles || [])
      .map((article) => normalizeArticleId(article?.articleId, article?.name, 0))
      .filter(Boolean)
  );

  for (let attempt = 0; attempt < 100; attempt += 1) {
    let generated = '';
    for (let index = 0; index < 6; index += 1) {
      const randomIndex = Math.floor(Math.random() * ARTICLE_ID_ALPHABET.length);
      generated += ARTICLE_ID_ALPHABET[randomIndex];
    }

    if (!existing.has(generated)) {
      return generated;
    }
  }

  return `ART${Date.now().toString(36).toUpperCase().slice(-3).padStart(3, '0')}`;
};

// Split article body into paragraphs using blank lines.
export const toParagraphs = (value) =>
  String(value ?? '')
    .split(/\r?\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
