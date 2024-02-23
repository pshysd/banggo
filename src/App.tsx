import React from 'react';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const AskLayout = loadable(() => import('@layouts/AskLayout'));
const MainLayout = loadable(() => import('@layouts/MainLayout'));
const QuestionLayout = loadable(() => import('@layouts/QuestionLayout'));

const LandingPage = loadable(() => import('@pages/LandingPage'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Login = loadable(() => import('@pages/Login'));
const Error = loadable(() => import('@pages/Error'));

const AskMain = loadable(() => import('@pages/AskMain'));
const AskDetail = loadable(() => import('@pages/AskDetail'));
const AIAnswer = loadable(() => import('@pages/AIAnswer'));
const TempPost = loadable(() => import('@pages/TempPost'));

const QuestionMain = loadable(() => import('@pages/QuestionMain'));
const QuestionNew = loadable(() => import('@pages/QuestionNew'));
const QuestionDetail = loadable(() => import('@pages/QuestionDetail'));

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route element={<MainLayout />}>
					<Route path="/ask" element={<AskLayout />}>
						<Route index element={<AskMain />} />
						<Route path="ai" element={<AIAnswer />} />
						<Route path=":id" element={<AskDetail />} />
						<Route path="new" element={<TempPost />} />
						<Route path="*" element={<Navigate to="/error" />} />
					</Route>
					<Route path="/question" element={<QuestionLayout />}>
						<Route index element={<QuestionMain />} />
						<Route path="new" element={<QuestionNew />} />
						<Route path=":id" element={<QuestionDetail />} />
					</Route>
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
