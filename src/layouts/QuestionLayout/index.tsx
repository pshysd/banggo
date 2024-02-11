import React from 'react';
import { Box } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const QuestionNav = loadable(() => import('@components/QuestionNav'));
const QuestionMain = loadable(() => import('@pages/QuestionMain'));
const QuestionEdit = loadable(() => import('@pages/QuestionEdit'));
const QuestionDetail = loadable(() => import('@pages/QuestionDetail'));
const QuestionNew = loadable(() => import('@pages/QuestionNew'));

function QuestionLayout() {
	return (
		<Box width={'100dvw'} height={'100dvh'}>
			<QuestionNav />
			<Routes>
				<Route path="/question" element={<QuestionMain />} />
				<Route path="/question/detail" element={<QuestionDetail />} />
				<Route path="/question/edit" element={<QuestionEdit />} />
				<Route path="/question/new" element={<QuestionNew />} />
				<Route path="*" element={<Navigate to="/error" />} />
			</Routes>
		</Box>
	);
}

export default QuestionLayout;
