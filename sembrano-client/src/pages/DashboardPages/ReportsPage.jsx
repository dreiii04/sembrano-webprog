import { useRef } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

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
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
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

const reportHighlights = [
  {
    label: 'Reports Generated',
    value: '89',
    caption: 'Last 30 days',
  },
  {
    label: 'On-Time Completion',
    value: '78%',
    caption: 'Up 5% this cycle',
  },
  {
    label: 'Open Requests',
    value: '14',
    caption: '4 flagged urgent',
  },
];

const cardSx = {
  borderRadius: '24px',
  border: '2px solid #18181b',
  backgroundColor: '#fafafa',
  boxShadow: '8px 8px 0 rgba(24, 24, 27, 0.2)',
};
const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Print Report</title>
        ${headMarkup}
        <style>
          @page {
            size: A4;
            margin: 16mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: "Work Sans", "Segoe UI", sans-serif;
            background: #f4f4f5;
            color: #18181b;
          }

          .report-shell {
            padding: 28px;
            background: #fafafa;
            border: 2px solid #18181b;
            border-radius: 24px;
          }

          .report-header {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #18181b;
          }

          .report-title {
            display: flex;
            gap: 14px;
            align-items: center;
          }

          .report-badge {
            background: #18181b;
            color: #fafafa;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 0.08em;
            padding: 8px 12px;
            border-radius: 999px;
            text-transform: uppercase;
          }

          .report-header h1 {
            margin: 0 0 6px;
            font-size: 26px;
            font-weight: 700;
            font-family: "Space Grotesk", "Work Sans", sans-serif;
          }

          .report-header p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }

          .report-meta {
            display: grid;
            gap: 4px;
            font-size: 13px;
            color: #4b5563;
          }

          .report-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .report-summary {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }

          .report-summary .MuiCard-root {
            border-radius: 20px;
            border: 2px solid #18181b;
            box-shadow: none !important;
          }

          .report-summary .MuiCardContent-root {
            padding: 16px;
          }

          .report-content .MuiCard-root {
            box-shadow: none !important;
            border: 2px solid #18181b;
            border-radius: 20px;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .report-content .MuiCardContent-root {
            padding: 20px;
          }

          .report-content svg {
            max-width: 100%;
          }

          .report-content .MuiDataGrid-footerContainer,
          .report-content .MuiDataGrid-selectedRowCount,
          .report-content .MuiDataGrid-columnHeaderCheckbox,
          .report-content .MuiDataGrid-cellCheckbox {
            display: none !important;
          }

          @media (max-width: 920px) {
            .report-summary {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <div class="report-title">
              <span class="report-badge">Sembrano</span>
              <div>
                <h1>Reports Summary</h1>
                <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              </div>
            </div>
            <div class="report-meta">
              <span>Prepared for Laboratory 5 Dashboard</span>
              <span>Exported on ${exportedAt}</span>
            </div>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>
    `);

    printWindow.document.close();
	printWindow.focus();
    printWindow.print();
  };
return (
  <Box>
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Report analytics overview showing generated reports,
          category breakdown, and current completion performance.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        flexWrap="wrap"
        useFlexGap
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        <Button variant="contained">Generate</Button>
        <Button variant="outlined" onClick={handlePrint}>Export</Button>
        <Button variant="outlined">Filter</Button>
      </Stack>
    </Stack>

    <Stack ref={printRef} spacing={3} className="report-content">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        className="report-summary"
      >
        {reportHighlights.map((item) => (
          <Card key={item.label} sx={{ ...cardSx, flex: 1 }}>
            <CardContent>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: '0.18em', fontWeight: 700 }}
              >
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.caption}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Card sx={cardSx}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Report Output
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This chart compares how many reports were generated and how
            many were completed across the last four months.
          </Typography>
          <BarChart
            series={[
              { data: [18, 24, 20, 27], label: 'Generated' },
              { data: [12, 19, 17, 23], label: 'Completed' },
            ]}
            height={300}
            xAxis={[
              {
                data: ['January', 'February', 'March', 'April'],
                scaleType: 'band',
                label: 'Months',
              },
            ]}
          />
        </CardContent>
      </Card>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Category Share
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              This chart shows the distribution of report requests by
              category for the current reporting period.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 14, label: 'Sales' },
                      { id: 1, value: 10, label: 'Users' },
                      { id: 2, value: 8, label: 'Inventory' },
                      { id: 3, value: 6, label: 'Finance' },
                    ],
                  },
                ]}
                width={280}
                height={220}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completion Rate
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              The gauge highlights the current percentage of reports
              completed on time based on the latest reporting cycle.
            </Typography>
            <Box
              sx={{
                minHeight: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Gauge width={180} height={180} value={78} />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={cardSx}>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </CardContent>
      </Card>
    </Stack>
  </Box>
);
};

export default ReportsPage;
