import { Typography } from '@mui/material';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import Typed from 'typed.js';

function AIAnswer() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher, {
		dedupingInterval: 1000 * 10,
	});

	const location = useLocation();
	const state = JSON.parse(location.state.aiAnswer);
	const el = useRef(null);

	const AIAnswer = state.data;
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

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<Typography
			component={'p'}
			ref={el}
			style={{
				paddingTop: '35dvh',
				paddingLeft: '5dvh',
				color: '#000000',
				fontSize: '1rem',
			}}
		/>
	);
}

export default AIAnswer;
