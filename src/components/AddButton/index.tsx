import { Box, Fab } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function AddButton() {
	const navigate = useNavigate();

	const onClickAddButton = () => {
		return navigate('/ask/new');
	};

	return (
		<>
			<Fab
				onClick={onClickAddButton}
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
				<AddIcon />
			</Fab>
		</>
	);
}

export default AddButton;
