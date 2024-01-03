import React from 'react';
import loadable from '@loadable/component';
import { Outlet } from 'react-router-dom';

const NavBar = loadable(() => import('@components/Navbar'));

function MainLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default MainLayout;
