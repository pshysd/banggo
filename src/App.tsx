import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const LandingPage = loadable(() => import('@pages/LandingPage'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Login = loadable(() => import('@pages/Login'));
const MainPage = loadable(() => import('@pages/MainPage'));

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/join" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route element={<MainLayout />}>
					<Route path="/main" element={<MainPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
