import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Container,
	Link,
	CircularProgress,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Footer from '@components/Footer';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

function Login() {
	const { data: user, mutate: mutateUser } = useSWR<IUser | false>('/api/auth', fetcher, { dedupingInterval: 0 });
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');
		try {
			const result = await axios.post(
				'/api/auth/login',
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);

			if (result) {
				mutateUser();
				return navigate('/ask');
			}
		} catch (e) {
			const err = e as Error;
			console.error(err);
			alert(err.response?.data);
		}
	};

	const onKakao = useCallback(async () => {
		window.location.href = `/api/auth/kakao`;
	}, []);

	const onGoogle = useCallback(() => {
		window.location.href = `/api/auth/google`;
	}, []);

	if (user === undefined) return <CircularProgress />;

	if (user) return <Navigate to={'/ask'} replace={true} />;

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 20,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'black.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					로그인
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField margin="normal" required fullWidth id="email" label="이메일" name="email" autoComplete="email" autoFocus />
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="비밀번호"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 1 }}>
						로그인
					</Button>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1%' }}>
						<Button
							type="button"
							fullWidth
							variant="contained"
							onClick={onKakao}
							sx={{ width: '49%', bgcolor: 'kakao.main', color: 'kakao.contrastText', ':hover': { bgcolor: 'kakao.dark' } }}
						>
							카카오 아이디로 로그인
						</Button>
						<Button type="button" fullWidth variant="outlined" onClick={onGoogle} sx={{ width: '49%' }}>
							구글 아이디로 로그인
						</Button>
					</div>
					<Grid container>
						<Grid item>
							<Link href="/signup" variant="body2">
								회원가입
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Footer />
		</Container>
	);
}

export default Login;
