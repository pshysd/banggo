import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';

const LandingPage = loadable(() => import('@pages/LandingPage'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Login = loadable(() => import('@pages/Login'));
const MainPage = loadable(() => import('@pages/MainPage'));

function App() {
	return (
		<Routes>
			<Route index element={<LandingPage />} />
			<Route path="/join" element={<SignUp />} />
			<Route path="/login" element={<Login />} />
			<Route path="/main" element={<MainPage />} />
		</Routes>
	);
}

export default App;
