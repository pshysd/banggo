import loadable from '@loadable/component';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const NavBar = loadable(() => import('@components/NavBar'));
function MainLayout() {
	return (
		<Box display={'flex'} width={'100dvw'} height={'100dvh'} flexDirection={'column'}>
			<NavBar />
			<Outlet />
		</Box>
	);
}

export default MainLayout;
