import React from 'react';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const AskLayout = loadable(() => import('@layouts/AskLayout'));
const QuestionLayout = loadable(() => import('@layouts/QuestionLayout'));
const LandingPage = loadable(() => import('@pages/LandingPage'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Login = loadable(() => import('@pages/Login'));
const Error = loadable(() => import('@pages/Error'));
const AskMain = loadable(() => import('@pages/AskMain'));
const AskDetail = loadable(() => import('@pages/AskDetail'));
const AskNew = loadable(() => import('@pages/AskNew'));
const AIAnswer = loadable(() => import('@pages/AIAnswer'));
const TempPost = loadable(() => import('@pages/TempPost'));

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/ask" element={<AskLayout />}>
					<Route index element={<AskMain />} />
					<Route path="ai" element={<AIAnswer />} />
					<Route path="detail/:id" element={<AskDetail />} />
					<Route path="new" element={<TempPost />} />
					<Route path="*" element={<Navigate to="/error" />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
