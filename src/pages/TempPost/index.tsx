import { Box, Container, Typography, Button, ToggleButtonGroup, Divider, Backdrop, ToggleButton } from '@mui/material';
import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import useSWR from 'swr';
import { ICategory, IUser } from '@typings/db';
import loadable from '@loadable/component';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetcher from '@utils/fetcher';

const Loading = loadable(() => import('@pages/Loading'));

function TempPost() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher, {
		dedupingInterval: 1000 * 10,
	});
	const { data: categories } = useSWR<ICategory[]>('/api/categories', fetcher, {
		dedupingInterval: 0,
	});

	const navigate = useNavigate();

	const [isSubmmit, setIsSubmmit] = useState<boolean>(false);
	const [category, setCategory] = useState<number | null>(null);
	const [result, setResult] = useState<{} | null>(null);

	const onClickCategory = (event: React.MouseEvent<HTMLElement>, id: number) => {
		setCategory(id);
	};

	const onClickSubmit = () => {
		setIsSubmmit((prev) => !prev);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		const problems = [];
		const solutions = [];

		if (category === null) return alert('카테고리를 설정해주셔야 합니다.');

		const title = data.get('title');
		const problem1 = data.get('problem1');
		const problem2 = data.get('problem2');
		const problem3 = data.get('problem3');
		const problem4 = data.get('problem4');
		const problem5 = data.get('problem5');
		const solution1 = data.get('solution1');
		const solution2 = data.get('solution2');
		const solution3 = data.get('solution3');
		const solution4 = data.get('solution4');
		const solution5 = data.get('solution5');

		const formData = {
			title,
			category,
			problem1,
			problem2,
			problem3,
			problem4,
			problem5,
			solution1,
			solution2,
			solution3,
			solution4,
			solution5,
		};

		try {
			const result = await axios.post('/api/counselings', formData, { withCredentials: true });

			if (result) {
				setResult(result.data.value);
				onClickSubmit();
			}
		} catch (e) {
			const err = e as Error;
			console.error(err.response?.data);
			alert(err.response?.data);
		}
	};

	const onAiAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const AIAnswer = await axios.post('/api/counselings/ai', result, { withCredentials: true });

		if (AIAnswer) {
			return navigate('/ask/ai', { state: { aiAnswer: JSON.stringify(AIAnswer) } });
		}
	};

	if (user === undefined || categories === undefined) {
		return <Loading />;
	}

	if (user === false) {
		return <Navigate to="/login" />;
	}

	return (
		<Container>
			<Box component={'form'} onSubmit={onSubmit} mt={1}>
				<Box display={'flex'} flexWrap={'wrap'}>
					<ToggleButtonGroup exclusive size="large" onChange={onClickCategory} value={category}>
						{categories &&
							categories.map((category, index) => (
								<ToggleButton key={index} value={category.id}>
									{category.name}
								</ToggleButton>
							))}
					</ToggleButtonGroup>
				</Box>
				<TextField required fullWidth id="title" label="제목" name="title" autoComplete="off" />
				<Divider />
				<TextField required fullWidth id="problem1" label="문제점1" name="problem1" autoComplete="off" />
				<TextField fullWidth id="problem2" label="문제점2" name="problem2" autoComplete="off" />
				<TextField fullWidth id="problem3" label="문제점3" name="problem3" autoComplete="off" />
				<Divider />
				<TextField fullWidth id="solution1" label="해결방안1" name="solution1" autoComplete="off" />
				<TextField fullWidth id="solution2" label="해결방안2" name="solution2" autoComplete="off" />
				<TextField fullWidth id="solution3" label="해결방안3" name="solution3" autoComplete="off" />
				<Divider />
				<Button type="submit">제출하기</Button>
				<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSubmmit} onClick={onClickSubmit}>
					<Box
						width={'75%'}
						height={'75%'}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						flexDirection={'column'}
						bgcolor={'white.main'}
					>
						<Typography>제출이 완료되었습니다. AI에게도 한번 물어볼까요?</Typography>
						<Button fullWidth onClick={onAiAnswer}>
							네. AI의 의견도 한번 물어보겠습니다.
						</Button>
						<Button fullWidth onClick={() => navigate('/ask')}>
							괜찮습니다. 메인 화면으로 돌아가겠습니다.
						</Button>
					</Box>
				</Backdrop>
			</Box>
		</Container>
	);
}

export default TempPost;
