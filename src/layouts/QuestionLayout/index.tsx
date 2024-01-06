import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import loadable from '@loadable/component';

const QuestionNav = loadable(() => import('@components/QuestionNav'));

function QuestionLayout() {
	return (
		<Box component={'div'} display={'flex'} justifyContent={'flex-start'}>
			<QuestionNav />
			<Outlet />
		</Box>
	);
}

export default QuestionLayout;
