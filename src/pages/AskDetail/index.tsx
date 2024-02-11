import { Box, Divider, Typography } from '@mui/material';
import { ICounseling, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { Navigate, useOutletContext } from 'react-router-dom';
import useSWR from 'swr';

function AskDetail() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher);
	const { data: counseling } = useSWR<ICounseling | null>(`/api/counseling/`, fetcher);

	if (user === false) {
		return <Navigate to="/login" />;
	}

	return (
		<Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'}>
			<Typography>{counseling?.title}</Typography>
			<Divider />
		</Box>
	);
}

export default AskDetail;
