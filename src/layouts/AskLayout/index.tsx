import loadable from '@loadable/component';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AskNav = loadable(() => import('@components/AskNav'));
const AskHistory = loadable(() => import('@components/AskHistory'));

function AskLayout() {
	return (
		<Box display={'flex'} width={'100dvw'} height={'100dvh'} flexDirection={'column'}>
			<AskNav />
			<Box display={'flex'} width={'100%'} height={'100%'}>
				<AskHistory />
				<Outlet />
			</Box>
		</Box>
	);
}

export default AskLayout;
