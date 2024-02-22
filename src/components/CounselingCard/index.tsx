import React from 'react';
import { Box, Button, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { ICounseling } from '@typings/db';
import SendIcon from '@mui/icons-material/Send';

type Props = {
	counseling: ICounseling;
};

const bull = (
	<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
		•
	</Box>
);

function CounselingCard({ counseling }: Props) {
	const createdAt = new Date(counseling.createdAt);
	const title = counseling.title;

	const year = createdAt.getFullYear();
	const month = createdAt.getMonth() + 1;
	const day = createdAt.getDate();

	return (
		<>
			<CardContent>
				<Typography variant="h5" component="div">
					{title}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{`${year}-${month}-${day}`}
				</Typography>
				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</>
	);
}

export default CounselingCard;
