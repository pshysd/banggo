import loadable from '@loadable/component';
import { Container, Typography } from '@mui/material';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import Typed from 'typed.js';

const Loading = loadable(() => import('@pages/Loading'));

function AIAnswer() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher, {
		dedupingInterval: 1000 * 10,
	});

	const location = useLocation();
	const AIAnswer = location.state.aiAnswer;
	const el = useRef(null);

	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: [AIAnswer],
			typeSpeed: 70,
			backSpeed: 30,
			showCursor: false,
		});

		return () => {
			typed.destroy();
		};
	}, [AIAnswer]);

	if (AIAnswer === null) {
		alert('잘못된 접근입니다.');
		return <Navigate to={'/ask'} />;
	}

	if (user) {
		return (
			<Container>
				<Typography
					component={'p'}
					ref={el}
					style={{
						paddingTop: '35dvh',
						paddingLeft: '5dvh',
						color: '#fff',
						fontSize: '3rem',
					}}
				/>
			</Container>
		);
	} else {
		alert('로그인되지 않은 사용자입니다.');
		return <Navigate to={'/login'} />;
	}
}

export default AIAnswer;
