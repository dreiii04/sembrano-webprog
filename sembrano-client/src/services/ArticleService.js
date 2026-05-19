import axios from 'axios';
import constants from '../constants.js';

const API = axios.create({
    baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get('/');

export const fetchArticleBySlug = (name) => API.get(`/slug/${encodeURIComponent(name)}`);

export const createArticle = (article) => API.post('/', article);

export const updateArticle = (id, article) => API.put(`/${id}`, article);
