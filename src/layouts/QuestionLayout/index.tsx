import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

function QuestionLayout() {
	return (
		<Box display={'flex'} width={'100%'} height={'100%'}>
			<Outlet />
		</Box>
	);
}

export default QuestionLayout;
