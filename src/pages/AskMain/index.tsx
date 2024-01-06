import { Box, Grid, Link, Typography } from '@mui/material';
import { ICounseling, IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import AddIcon from '@mui/icons-material/Add';
import Counseling from '../../components/Counseling/index';

function AskMain() {
	const { data: user } = useSWR<IUser>('/api/users', fetcher);
	const { data: counselings } = useSWR<ICounseling[]>(`/api/counselings/${user}?count=6`, fetcher);

	return (
		<Box width={'100%'} height={'100%'} padding={'5% 10%'}>
			<Typography>고민거리를 작성해보세요!</Typography>
			<Grid height={'85%'} container spacing={2}>
				{counselings &&
					counselings.map((counseling) => {
						return (
							<Grid item xs={6} md={4}>
								<Counseling counseling={counseling} />
							</Grid>
						);
					})}
				<Grid item xs={6} md={4}>
					1
				</Grid>
				<Grid item xs={6} md={4}>
					2
				</Grid>
				<Grid item xs={6} md={4}>
					3
				</Grid>
				<Grid item xs={6} md={4}>
					4
				</Grid>
				<Grid item xs={6} md={4}>
					5
				</Grid>
				<Grid item xs={6} md={4}>
					6
				</Grid>
			</Grid>
			<Box sx={{ float: 'right' }}>
				<Link href="/ask/new">
					<AddIcon />
				</Link>
			</Box>
		</Box>
	);
}

export default AskMain;
