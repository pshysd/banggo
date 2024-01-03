import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

function LandingPage() {
	const el = useRef(null);
	const navigate = useNavigate();

	const onClickSignup = () => {
		navigate('/join');
	};

	const onClickLogin = () => {
		navigate('/login');
	};

	const handleKakao = useCallback(async () => {
		window.location.href = `/api/users/kakao`;
	}, []);

	const handleGoogle = useCallback(() => {
		window.location.href = `/api/users/google`;
	}, []);

	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: ['HELLO!', '안녕하세요!'],
			typeSpeed: 70,
			backSpeed: 30,
			showCursor: false,
		});

		return () => {
			typed.destroy();
		};
	}, []);

	return (
		<div style={{ display: 'flex' }}>
			<Box sx={{ bgcolor: 'teal.main' }} width={'60dvw'} height={'100dvh'}>
				<Typography
					variant="h1"
					sx={{
						color: 'black.main',
						paddingLeft: '3%',
						paddingTop: '2%',
						fontSize: '1.2rem',
					}}
				>
					BANGGO
				</Typography>
				<p
					ref={el}
					style={{
						paddingTop: '35dvh',
						paddingLeft: '5dvh',
						color: '#fff',
						fontSize: '3rem',
					}}
				/>
			</Box>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'40dvw'}
				height={'100dvh'}
				sx={{ bgcolor: 'black.main', padding: '0 5%', paddingTop: '25%' }}
			>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						variant="contained"
						onClick={handleKakao}
						sx={{
							bgcolor: 'kakao.main',
							color: 'kakao.contrastText',
							width: '49%',
							':hover': {
								bgcolor: 'kakao.dark',
							},
						}}
					>
						카카오 로그인
					</Button>
					<Button variant="contained" onClick={handleGoogle} sx={{ width: '49%' }}>
						구글 로그인
					</Button>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Button
						variant="contained"
						onClick={onClickLogin}
						sx={{
							bgcolor: 'gray.main',
							mt: 0.5,
							':hover': {
								bgcolor: 'gray.dark',
							},
						}}
					>
						로그인
					</Button>
					<Button
						variant="contained"
						onClick={onClickSignup}
						sx={{
							bgcolor: 'gray.main',
							mt: 0.5,
							':hover': {
								bgcolor: 'gray.dark',
							},
						}}
					>
						회원가입
					</Button>
				</div>
			</Box>
		</div>
	);
}

export default LandingPage;
