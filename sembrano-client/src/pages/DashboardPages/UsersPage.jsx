import { DataGrid } from '@mui/x-data-grid';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (_value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function UsersPage() {
  const withAge = rows.filter((user) => user.age !== null);
  const averageAge = (withAge.reduce((sum, user) => sum + user.age, 0) / withAge.length).toFixed(1);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Users Table
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        DataGrid output uses MUI sample user rows and columns.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ borderRadius: 3, minWidth: 220, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, minWidth: 220, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Average Age
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {averageAge}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ height: 460, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default UsersPage;
