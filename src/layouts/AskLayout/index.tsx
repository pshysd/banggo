import loadable from '@loadable/component';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const NavBar = loadable(() => import('@components/AskNav'));
const AskHistory = loadable(() => import('@components/AskHistory'));

function AskLayout() {
	return (
		<Box width={'100dvw'} height={'100dvh'}>
			<NavBar />
			<Box display={'flex'} height={'100%'}>
				<AskHistory />
				<Outlet />
			</Box>
		</Box>
	);
}

export default AskLayout;
