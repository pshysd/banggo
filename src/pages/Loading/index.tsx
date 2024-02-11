import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

function Loading() {
	return (
		<Box display={'flex'} flexDirection={'column'}>
			<Typography component={'h1'}>잠시만 기다려주세요...</Typography>
			<CircularProgress />
		</Box>
	);
}

export default Loading;
