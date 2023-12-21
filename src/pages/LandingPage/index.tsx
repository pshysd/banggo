import React, { useEffect, useRef } from 'react';
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

	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: ['HELLO!'],
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
				<p ref={el} style={{ paddingTop: '35dvh', paddingLeft: '5dvh', color: '#ffffff', fontSize: '3rem' }} />
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
				<Button variant="outline-info" style={{ width: '60%' }} onClick={onClickLogin}>
					로그인
				</Button>
				<Button variant="outline-info" style={{ width: '60%', marginTop: '0.5%' }} onClick={onClickSignup}>
					회원가입
				</Button>
			</div>
		</div>
	);
}

export default LandingPage;
