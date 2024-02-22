import loadable from '@loadable/component';
import { Box, Divider, Typography } from '@mui/material';
import { ICounseling, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

const Loading = loadable(() => import('@pages/Loading'));
const Error = loadable(() => import('@pages/Error'));
const HomeButton = loadable(() => import('@components/HomeButton'));

function AskDetail() {
	const { id } = useParams();

	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher, { dedupingInterval: 1000 * 60 });
	const { data: counseling } = useSWR<ICounseling>(`/api/counselings/${id}`, fetcher);

	if (user === false) {
		return <Navigate to="/login" />;
	}

	if (counseling === undefined) {
		return <Loading />;
	}

	return (
		<Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'}>
			<Typography>{counseling.title}</Typography>
			<HomeButton />
		</Box>
	);
}

export default AskDetail;
