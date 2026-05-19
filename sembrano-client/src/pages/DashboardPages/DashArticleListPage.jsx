import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import {
  createArticle,
  fetchArticles,
  updateArticle,
} from '../../services/ArticleService';

const blankForm = {
  title: '',
  name: '',
  content: '',
};

const STATUS_OPTIONS = {
  all: 'All Statuses',
  active: 'Active',
  inactive: 'Disabled',
};

const surfaceSx = {
  borderRadius: '24px',
  border: '2px solid #18181b',
  backgroundColor: '#fafafa',
  boxShadow: '8px 8px 0 rgba(24, 24, 27, 0.2)',
};

const ARTICLE_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const buildSlug = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toParagraphs = (value) =>
  String(value ?? '')
    .split(/\r?\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const generateArticleId = () => {
  let generated = '';
  for (let index = 0; index < 6; index += 1) {
    const randomIndex = Math.floor(Math.random() * ARTICLE_ID_ALPHABET.length);
    generated += ARTICLE_ID_ALPHABET[randomIndex];
  }

  return generated;
};

const normalizeArticle = (article, index) => ({
  id: article._id ?? article.id ?? `${index + 1}`,
  name: String(article.name ?? '').trim(),
  articleId: String(article.articleId ?? '').trim().toUpperCase(),
  title: String(article.title ?? '').trim(),
  content: Array.isArray(article.content)
    ? article.content.map((paragraph) => String(paragraph ?? '').trim()).filter(Boolean)
    : [],
  isActive: article.isActive === false ? false : true,
});

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    setLoadError('');

    try {
      const { data } = await fetchArticles();
      const rows = Array.isArray(data?.articles) ? data.articles : [];
      setArticles(rows.map(normalizeArticle));
    } catch (error) {
      console.error('Unable to load articles:', error);
      setLoadError('Unable to load articles right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setForm(
      article
        ? {
            title: article.title,
            name: article.name,
            content: article.content.join('\n\n'),
          }
        : { ...blankForm }
    );
    setErrors({});
    setSubmitError('');
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...blankForm });
    setErrors({});
    setSubmitError('');
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const title = form.title.trim();
    const slug = buildSlug(form.name || title);
    const content = toParagraphs(form.content);

    if (!title) {
      nextErrors.title = 'Title is required.';
    }

    if (!slug) {
      nextErrors.name = 'Slug is required.';
    }

    if (!content.length) {
      nextErrors.content = 'Add at least one paragraph.';
    }

    if (
      !nextErrors.name &&
      articles.some((article) => article.id !== modal.id && article.name === slug)
    ) {
      nextErrors.name = 'Slug already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const title = form.title.trim();
    const slug = buildSlug(form.name || title);
    const content = toParagraphs(form.content);

    try {
      if (modal.id) {
        const existingArticle = articles.find((article) => article.id === modal.id);
        await updateArticle(modal.id, {
          title,
          name: slug,
          content,
          isActive: existingArticle ? existingArticle.isActive !== false : true,
        });
      } else {
        await createArticle({
          title,
          name: slug,
          articleId: generateArticleId(),
          content,
          isActive: true,
        });
      }

      await loadArticles();
      closeModal();
    } catch (error) {
      console.error('Unable to save article:', error);
      const message = error.response?.data?.message || 'Unable to save article right now.';

      if (/name_1/i.test(message)) {
        setErrors((prev) => ({ ...prev, name: 'Slug already exists.' }));
      }

      if (/articleId_1/i.test(message)) {
        setSubmitError('Article ID already exists. Please try saving again.');
        return;
      }

      setSubmitError(message);
    }
  };

  const handleToggleStatus = async (row) => {
    try {
      await updateArticle(row.id, { isActive: row.isActive === false });
      setArticles((prev) =>
        prev.map((article) =>
          article.id === row.id
            ? {
                ...article,
                isActive: article.isActive === false,
              }
            : article
        )
      );
    } catch (error) {
      console.error('Unable to update article status:', error);
      setSubmitError(error.response?.data?.message || 'Unable to update article status.');
    }
  };

  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = [article.title, article.name, article.articleId]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));

    const isActive = article.isActive !== false;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && isActive) ||
      (statusFilter === 'inactive' && !isActive);

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      field: 'articleId',
      headerName: 'ID',
      minWidth: 110,
      flex: 0.5,
    },
    {
      field: 'name',
      headerName: 'Slug',
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 220,
    },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (_value, row) => row.content?.length ?? 0,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      minWidth: 320,
      flex: 1.4,
      valueGetter: (_value, row) => (row.content?.[0] || '').slice(0, 60),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive === false ? 'Disabled' : 'Active'}
          size="small"
          sx={{
            height: 22,
            fontWeight: 700,
            color: '#fff',
            backgroundColor: row.isActive === false ? '#6b7280' : '#2e7d32',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 190,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5, alignItems: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
            sx={{ minWidth: 58, px: 1.2, fontSize: '0.66rem' }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleStatus(row)}
            sx={{
              minWidth: 70,
              px: 1.2,
              fontSize: '0.62rem',
              border: 'none',
              backgroundColor: row.isActive === false ? '#2e7d32' : '#ef6c00',
              '&:hover': {
                backgroundColor: row.isActive === false ? '#1b5e20' : '#e65100',
              },
            }}
          >
            {row.isActive === false ? 'Enable' : 'Disable'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: '1.45rem', md: '2rem' } }}>
          Articles
        </Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' }, px: 2.4 }}
        >
          Add Article
        </Button>
      </Box>

      <Paper sx={{ ...surfaceSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }}>
            <TextField
              placeholder="Search Articles"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 1,
                },
              }}
            />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 180 } }}>
              <Select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                displayEmpty
              >
                <MenuItem value="all">{STATUS_OPTIONS.all}</MenuItem>
                <MenuItem value="active">{STATUS_OPTIONS.active}</MenuItem>
                <MenuItem value="inactive">{STATUS_OPTIONS.inactive}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {loadError ? (
          <Alert severity="error">{loadError}</Alert>
        ) : articles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No articles found. Use Add Article to create one.</Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {submitError ? <Alert severity="error">{submitError}</Alert> : null}
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
              />
              <TextField
                label="Slug"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name || 'Leave blank to generate from the title.'}
                fullWidth
              />
              <TextField
                label="Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                error={Boolean(errors.content)}
                helperText={errors.content || 'Separate paragraphs with a blank line.'}
                fullWidth
                multiline
                rows={6}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
