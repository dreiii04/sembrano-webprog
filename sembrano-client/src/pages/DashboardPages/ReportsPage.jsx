import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const barSeriesA = [35, 44, 24, 34, 60, 55, 41];
const barSeriesB = [51, 6, 49, 30, 27, 40, 52];

function ReportsPage() {
	return (
		<Box>
			<Typography variant="h4" fontWeight={700} gutterBottom>
				Reports & Analytics
			</Typography>
			<Typography color="text.secondary" sx={{ mb: 3 }}>
				Charts are populated with MUI sample-style datasets.
			</Typography>

			<Stack direction="row" spacing={1} sx={{ mb: 3 }}>
				<Chip label="Last 30 Days" color="primary" />
				<Chip label="Revenue" variant="outlined" />
				<Chip label="Users" variant="outlined" />
			</Stack>

			<Box
				sx={{
					display: 'grid',
					gap: 2,
					gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
					mb: 2,
				}}
			>
				<Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
					<CardContent>
						<Typography variant="h6" sx={{ mb: 1.5 }}>
							Monthly Performance
						</Typography>
						<LineChart
							xAxis={[{ data: xLabels, scaleType: 'point' }]}
							series={[
								{ data: uData, label: 'uv' },
								{ data: pData, label: 'pv' },
							]}
							height={280}
						/>
					</CardContent>
				</Card>

				<Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
					<CardContent>
						<Typography variant="h6" sx={{ mb: 1.5 }}>
							Category Split
						</Typography>
						<PieChart
							series={[
								{
									data: [
										{ id: 0, value: 10, label: 'series A' },
										{ id: 1, value: 15, label: 'series B' },
										{ id: 2, value: 20, label: 'series C' },
									],
								},
							]}
							height={280}
						/>
					</CardContent>
				</Card>
			</Box>

			<Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
				<CardContent>
					<Typography variant="h6" sx={{ mb: 1.5 }}>
						Comparison Bar Chart
					</Typography>
					<BarChart
						xAxis={[{ data: xLabels, scaleType: 'band' }]}
						series={[
							{ data: barSeriesA, label: 'Series 1' },
							{ data: barSeriesB, label: 'Series 2' },
						]}
						height={300}
					/>
				</CardContent>
			</Card>
		</Box>
	);
}

export default ReportsPage;
