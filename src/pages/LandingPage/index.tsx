import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
	const navigate = useNavigate();

	const onClickSignup = () => {
		navigate('/join');
	};

	const onClickLogin = () => {
		navigate('/login');
	};

	return (
		<div style={{ display: 'flex', width: '100dvw', height: '100dvh' }}>
			<div
				style={{
					width: '60dvw',
					height: '100dvh',
					backgroundColor: '#38419D',
				}}
			>
				12345
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '40dvw',
					height: '100dvh',
					backgroundColor: '#200E3A',
					paddingTop: '20vh',
					paddingBottom: '20vh',
				}}
			>
				<Button variant="outline-info" style={{width: '50%'}} onClick={onClickLogin}>
					로그인
				</Button>
				<Button variant="outline-info" onClick={onClickSignup}>
					회원가입
				</Button>
			</div>
		</div>
	);
}

export default LandingPage;
