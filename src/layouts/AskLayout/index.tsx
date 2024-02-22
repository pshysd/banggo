import loadable from '@loadable/component';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AskHistory = loadable(() => import('@components/AskHistory'));

function AskLayout() {
	return (
		<Box display={'flex'} width={'100%'} height={'100%'}>
			<AskHistory />
			<Outlet />
		</Box>
	);
}

export default AskLayout;
