import { Fab } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function HomeButton() {
	const navigate = useNavigate();

	const onClickHomeButton = () => {
		return navigate('/ask');
	};

	return (
		<>
			<Fab
				onClick={onClickHomeButton}
				color="primary"
				aria-label="add"
				size="large"
				sx={{
					right: '5%',
					bottom: '8%',
					position: 'fixed',
					bgcolor: 'black.main',
					':hover': {
						bgcolor: 'black.light',
					},
				}}
			>
				<HomeIcon />
			</Fab>
		</>
	);
}

export default HomeButton;
