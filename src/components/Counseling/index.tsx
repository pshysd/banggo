import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ICounseling } from '@typings/db';

type Props = {
	counseling: ICounseling;
};

function Counseling({ counseling }: Props) {
	const { title, createdAt } = counseling;

	const year = createdAt.getFullYear();
	const month = createdAt.getMonth() + 1;
	const day = createdAt.getDate();

	return (
		<Button variant="outlined">
			<Box component={'div'}>
				<Typography align="center" variant="subtitle1">
					{title}
				</Typography>
				<Divider />
				<Typography align="center" variant="subtitle1">
					{`${year}-${month}-${day}`}
				</Typography>
			</Box>
		</Button>
	);
}

export default Counseling;
