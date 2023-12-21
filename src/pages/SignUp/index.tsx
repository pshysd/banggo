import axios from 'axios';
import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface ISignUpForm {
	email: string;
	password: string;
	contact?: string;
	nickname?: string;
}

function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpForm>({
		mode: 'onBlur',
	});

	const onSubmit = useCallback(async (form: ISignUpForm) => {
		try {
			const result = await axios.post('/api/users', form, {
				withCredentials: true,
			});
		} catch (e) {
			const err = e as Error;
			console.error(err);
		}
	}, []);

	return (
		<div>
			<h1>회원가입</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				
			</Form>
		</div>
	);
}

export default SignUp;
