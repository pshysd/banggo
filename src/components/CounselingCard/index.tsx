import { useCallback } from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import { ICounseling } from '@typings/db';
import { useNavigate } from 'react-router-dom';

type Props = {
	counseling: ICounseling;
};

function CounselingCard({ counseling }: Props) {
	const navigate = useNavigate();

	const createdAt = new Date(counseling.createdAt);
	const title = counseling.title;

	const year = createdAt.getFullYear();
	const month = createdAt.getMonth() + 1;
	const day = createdAt.getDate();

	const onClickCard = useCallback(() => {
		navigate(`/ask/${counseling.id}`, { state: counseling });
	}, [counseling, navigate]);

	return (
		<Box onClick={() => onClickCard()}>
			<CardContent sx={{ border: '1px solid black', ':hover': { cursor: 'pointer' } }}>
				<Typography variant="h5" component="div" textAlign={'center'}>
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary" textAlign={'right'}>
					{`${year}-${month}-${day}`}
				</Typography>
			</CardContent>
		</Box>
	);
}

export default CounselingCard;
