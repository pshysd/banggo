import React, { useCallback, useEffect, useRef } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';

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
		});

		return () => {
			typed.destroy();
		};
	}, []);

	return (
		<div style={{ display: 'flex', width: '100dvw', height: '100dvh' }}>
			<div
				style={{
					width: '60dvw',
					height: '100dvh',
					backgroundColor: '#38419D',
				}}
			>
				<h1
					style={{
						color: '#ffffff',
						paddingLeft: '3%',
						paddingTop: '2%',
						fontSize: '1.2rem',
					}}
				>
					BANGGO
				</h1>
				<p
					ref={el}
					style={{
						paddingTop: '35dvh',
						paddingLeft: '5dvh',
						color: '#ffffff',
						fontSize: '3rem',
					}}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					width: '40dvw',
					height: '100dvh',
					backgroundColor: '#200E3A',
				}}
			>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Button variant="outline-warning" style={{ width: '30%' }} onClick={handleKakao}>
						카카오 로그인
					</Button>
					<Button variant="outline-primary" style={{ width: '30%' }} onClick={handleGoogle}>
						구글 로그인
					</Button>
				</div>
				<div
					style={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Button variant="outline-info" style={{ width: '60%', marginTop: '0.5%' }} onClick={onClickLogin}>
						로그인
					</Button>
					<Button variant="outline-info" style={{ width: '60%', marginTop: '0.5%' }} onClick={onClickSignup}>
						회원가입
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
