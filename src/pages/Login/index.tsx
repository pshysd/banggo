import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Footer from '@components/Footer';

function Login() {
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			try {
				const result = await axios.post('/api/users/login', formData, {
					withCredentials: true,
				});

				if (result) return navigate('/main');
			} catch (e) {
				const err = e as Error;
				console.error(err);
			}
		},
		[navigate]
	);

	const handleKakao = useCallback(async () => {
		window.location.href = `/api/users/kakao`;
	}, []);

	const handleGoogle = useCallback(() => {
		window.location.href = `/api/users/google`;
	}, []);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
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
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
						로그인
					</Button>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1%' }}>
						<Button type="submit" fullWidth variant="outlined" onClick={handleKakao} sx={{ width: '49%' }}>
							카카오 아이디로 로그인
						</Button>
						<Button type="submit" fullWidth variant="outlined" onClick={handleGoogle} sx={{ width: '49%' }}>
							구글 아이디로 로그인
						</Button>
					</div>
					<Grid container>
						<Grid item xs>
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
