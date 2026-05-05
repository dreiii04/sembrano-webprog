import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

const summaryCards = [
  { title: 'Total Users', value: 9 },
  { title: 'Reports Generated', value: 24 },
];

const cardSx = {
  borderRadius: '24px',
  border: '2px solid #18181b',
  backgroundColor: '#fafafa',
  boxShadow: '8px 8px 0 rgba(24, 24, 27, 0.2)',
};

function DashboardPage() {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Quick overview.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button variant="contained" component={RouterLink} to="/dashboard/reports">
            Open Reports
          </Button>
          <Button variant="outlined" component={RouterLink} to="/dashboard/users">
            Manage Users
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          mb: 3,
        }}
      >
        {summaryCards.map((card) => (
          <Card key={card.title} sx={cardSx}>
            <CardContent>
              <Typography
                color="text.secondary"
                variant="overline"
                sx={{ letterSpacing: '0.18em', fontWeight: 700 }}
              >
                {card.title}
              </Typography>
              <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default DashboardPage;