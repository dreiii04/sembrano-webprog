const express = require('express');
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.get('/slug/:name', getArticleBySlug);
router.put('/:id', updateArticle);

module.exports = router;
