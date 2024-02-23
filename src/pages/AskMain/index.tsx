import { Box, Grid, Typography } from '@mui/material';
import { ICounseling, IUser } from '@typings/db';
import { Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import CounselingCard from '@components/CounselingCard';

const AddButton = loadable(() => import('@components/AddButton'));
const Loading = loadable(() => import('@pages/Loading'));

function AskMain() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher, { dedupingInterval: 1000 * 60 });
	const { data: counselings } = useSWR<ICounseling[] | null>(user ? `/api/users/counselings/${user.id}?limit=6` : null, fetcher, {
		dedupingInterval: 0,
	});

	if (user === undefined) {
		return <Loading />;
	}
	// 유저 정보가 없을 경우 -> 로그인 되지 않았을 경우
	if (!user) {
		return <Navigate to={'/login'} />;
	}

	// 유저 정보 있음, 상담기록 없음
	if (!counselings) {
		return (
			<Box display={'flex'} width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
				<Typography variant="h4">데이터가 존재하지 않습니다.</Typography>
				<AddButton />
			</Box>
		);
	}

	return (
		<Box display={'flex'} width={'100%'} height={'100%'} flexDirection={'column'}>
			<Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'30%'}>
				<Typography variant="h4">가장 최근에 상담한 기록 6개 입니다.</Typography>
			</Box>
			<Grid container spacing={3} width={'100%'} margin={0}>
				{counselings &&
					counselings.map((counseling, index) => (
						<Grid item xs={6} md={4} key={index}>
							<CounselingCard counseling={counseling} />
						</Grid>
					))}
			</Grid>
			<AddButton />
		</Box>
	);
}

export default AskMain;
