import {
	Box,
	Button,
	List,
	ListItem,
	Slide,
	TextField,
	ListItemText,
	ButtonGroup,
	Typography,
	CircularProgress,
	Divider,
} from '@mui/material';
import { ICounseling, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Stepper from '@components/Stepper';

function AskNew() {
	const { data: user } = useSWR<IUser | false>('/api/auth', fetcher);

	const navigate = useNavigate();

	const [step, setStep] = useState<number>(0);

	// 제목 input
	const [title, setTitle] = useState<string>('');
	// 문제사항 input
	const [problem, setProblem] = useState<string>('');
	// 해결방안 input
	const [solution, setSolution] = useState<string>('');
	// 카테고리 select
	const [category, setCategory] = useState<number | null>(null);

	// 실제로 보낼 문제사항 list
	const [problems, setProblems] = useState<string[]>(['']);

	// 실제로 보낼 해결방안 list
	const [solutions, setSolutions] = useState<string[]>(['']);

	const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	}, []);

	const onChangeProblem = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {}, []);

	const onChangeSolution = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {}, []);

	const onNextButton = useCallback(() => {
		setStep((prev) => prev + 1);
	}, []);

	const onPrevButton = useCallback(() => {
		setStep((prev) => prev - 1);
	}, []);

	const onAddProblem = () => {
		setProblems([...problems, problem]);
		setProblem('');
	};

	const onRemoveProblem = (key: number) => {
		setProblems(problems.filter((problem, i) => i !== key));
	};

	const onRemoveSolution = (key: number) => {
		setSolutions(solutions.filter((solution, i) => i !== key));
	};

	const onAddSolution = () => {
		setSolutions([...solutions, '']);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const result: ICounseling = await axios.post(`/api/counselings`, { title, problems, solutions }, { withCredentials: true });

			if (result) {
				alert('성공적으로 작성되었습니다');
				navigate(`/ask/detail/${result.id}`);
			}
		} catch (e) {
			const err = e as Error;
			alert(err);
		}
	};

	if (user === undefined) {
		return (
			<Box>
				<CircularProgress />
				<Typography variant="body2">잠시만 기다려주세요...</Typography>
			</Box>
		);
	}

	if (user === false) {
		alert('로그인한 사용자만 이용할 수 있는 서비스입니다.');
		return <Navigate to={'/login'} />;
	}

	return (
		<Box component={'form'} onSubmit={onSubmit} width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'} padding={'5% 10%'}>
			<Slide direction="left" in={step === 0} mountOnEnter unmountOnExit>
				<Box>
					<Typography component={'h1'}></Typography>
					<TextField required fullWidth label={'고민거리 제목'} />
					<Button variant="outlined" onClick={onNextButton}>
						다음
					</Button>
				</Box>
			</Slide>
			<Slide direction="left" in={step === 1} mountOnEnter unmountOnExit>
				<Box>
					<List>
						{problems.map((problem, index) => (
							<ListItem key={index}>
								<ListItemText>
									<TextField label={`Problem ${index + 1}`} value={problem} fullWidth />
								</ListItemText>
								<IconButton edge={'end'} onClick={() => onRemoveProblem(index)}>
									<RemoveIcon />
								</IconButton>
							</ListItem>
						))}
					</List>
					<ListItem>
						<IconButton edge={'end'} onClick={onAddProblem}>
							<AddIcon />
						</IconButton>
					</ListItem>
					<ButtonGroup>
						<Button onClick={onPrevButton}>이전</Button>
						<Button onClick={onNextButton}>다음</Button>
					</ButtonGroup>
					<Divider />
				</Box>
			</Slide>
			<Slide direction="left" in={step === 2} mountOnEnter unmountOnExit>
				<Box flexGrow={1}>
					<List>
						{solutions.map((solution, index) => (
							<ListItem key={index}>
								<ListItemText>
									<TextField label={`Solution ${index + 1}`} fullWidth />
								</ListItemText>
								<IconButton onClick={() => onRemoveProblem(index)}>
									<RemoveIcon />
								</IconButton>
							</ListItem>
						))}
						<ListItem>
							<IconButton edge={'end'} onClick={onAddSolution}>
								<AddIcon />
							</IconButton>
						</ListItem>
					</List>
					<ButtonGroup>
						<Button onClick={onPrevButton}>이전</Button>
						<Button onClick={onNextButton}>다음</Button>
					</ButtonGroup>
					<Divider />
				</Box>
			</Slide>
		</Box>
	);
}

export default AskNew;
