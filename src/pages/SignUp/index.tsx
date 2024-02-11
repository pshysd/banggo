import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '@components/Footer';
import { Navigate, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback } from 'react';
import { CircularProgress, Divider } from '@mui/material';

export default function SignUp() {
	const { data: user, mutate: mutateUser } = useSWR<IUser>(`/api/auth`, fetcher, {
		dedupingInterval: 0,
	});
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const email = formData.get('email');
			const password = formData.get('password');
			const nickname = formData.get('nickname');
			try {
				const result = await axios.post(
					'/api/auth',
					{
						email,
						password,
						nickname,
					},
					{ withCredentials: true }
				);

				if (result) {
					const login = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });

					if (login) {
						mutateUser();
						navigate('/ask');
					}
				}
			} catch (e) {
				const err = e as Error;
				console.error(err);
				alert(err.response?.data);
			}
		},
		[mutateUser, navigate]
	);

	const handleKakao = useCallback(async () => {
		window.location.href = `/api/auth/kakao`;
	}, []);

	const handleGoogle = useCallback(() => {
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
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					회원가입
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Divider />
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField required fullWidth id="email" label="이메일" name="email" autoComplete="email" />
						</Grid>
						<Grid item xs={12}>
							<TextField required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="new-password" />
						</Grid>
						<Grid item xs={12}>
							<TextField fullWidth name="nickname" label="닉네임(선택)" id="nickname" />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						회원가입
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item xs={12}>
							<Typography display={'inline-block'}>이미 계정이 있으시다면? &nbsp;</Typography>
							<Link href="/login" variant="body2" sx={{ textDecoration: 'none' }}>
								로그인 하러가기
							</Link>
						</Grid>
						<Grid item xs={6}>
							<Button fullWidth variant="outlined" onClick={handleKakao}>
								카카오 계정으로 가입하기
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button fullWidth variant="outlined" onClick={handleGoogle}>
								구글 계정으로 가입하기
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Footer />
		</Container>
	);
}
