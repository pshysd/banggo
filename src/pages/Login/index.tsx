import { useCallback } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ILoginForm {
	email: string;
	password: string;
}

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		mode: 'onBlur',
	});

	const navigate = useNavigate();

	const onSubmit = useCallback(
		async (form: ILoginForm) => {
			try {
				const result = await axios.post('/api/users/login', form, {
					withCredentials: true,
				});

				if (result) return navigate('/');
			} catch (e) {
				const err = e as Error;
				alert(err);
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
		<div style={{ margin: '15% 30%' }}>
			<h1 style={{ textAlign: 'center' }}>로그인 페이지</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3" controlId="email">
					<FloatingLabel controlId="email" className="mb-3" label="이메일">
						<Form.Control
							type="email"
							{...register('email', {
								required: '이메일을 입력해주세요.',
								pattern: {
									value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									message: '유효하지 않은 이메일 형식입니다.',
								},
							})}
						/>
					</FloatingLabel>
					{errors?.email && <Form.Text style={{ color: 'red' }}>{errors.email.message}</Form.Text>}
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<FloatingLabel controlId="password" className="mb-3" label="비밀번호">
						<Form.Control
							type="password"
							{...register('password', {
								required: '비밀번호를 입력해주세요.',
								pattern: {
									value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{10,}$/,
									message: '영어, 특수문자, 숫자가 각각 한 글자씩은 포함되어있어야 합니다.',
								},
								minLength: {
									value: 9,
									message: '비밀번호는 10글자 이상이어야 합니다.',
								},
							})}
						/>
					</FloatingLabel>
					{errors?.password ? (
						<Form.Text style={{ color: 'red' }}>{errors?.password.message}</Form.Text>
					) : (
						<Form.Text>대소문자, 특수문자, 숫자가 각각 하나씩은 포함된 10글자 이상의 비밀번호를 만들어주세요.</Form.Text>
					)}
				</Form.Group>
				<Button variant="primary" type="submit" style={{ width: '100%' }}>
					로그인
				</Button>
				<br />
				<Form.Text>
					혹시 회원가입을 하지 않으셨다면? <br />
					<Link to="/signup">당장 계정 만들러 가기</Link>
				</Form.Text>
			</Form>
			<div>
				<Button variant="warning" onClick={handleKakao} style={{ width: '100%' }}>
					카카오 로그인
				</Button>
				<Button onClick={handleGoogle} style={{ width: '100%', marginTop: '1%' }}>
					구글 로그인
				</Button>
			</div>
		</div>
	);
}

export default Login;
