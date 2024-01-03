import React from 'react';
import { Typography, Link } from '@mui/material';

function Footer() {
	return (
		<Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
			{'Copyright © '}
			<Link color="inherit" href="https://github.com/pshysd/banggo">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default Footer;
