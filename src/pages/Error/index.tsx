import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';

type Props = {
	code?: number;
	message?: string;
};

function Error({ code, message }: Props) {
	const navigate = useNavigate();

	return (
		<Box display={'flex'} width={'100%'} height={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
			<Typography variant="h3" color={'red'} mb={1}>
				Error: {code}
			</Typography>
			<Typography variant="body1" mb={1}>
				{message}
			</Typography>
			<Typography variant="h4" onClick={() => navigate(-1)} sx={{ ':hover': { cursor: 'pointer' } }}>
				돌아가기
			</Typography>
		</Box>
	);
}

Error.defaultProps = {
	code: 404,
	message: '해당 페이지는 존재하지 않습니다.',
};

export default Error;
