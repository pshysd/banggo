import { alpha, createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		black: {
			main: '#222831',
			light: alpha('#222831', 0.5),
			dark: alpha('#222831', 0.8),
		},

		gray: {
			main: '#393E46',
			light: alpha('#393E46', 0.5),
			dark: alpha('#393E46', 0.8),
		},

		white: {
			main: '#EEEEEE',
			light: alpha('#EEEEEE', 0.5),
			dark: alpha('#EEEEEE', 0.8),
		},

		teal: {
			main: '#00ADB5',
			light: alpha('#00ADB5', 0.5),
			dark: alpha('#00ADB5', 0.8),
		},

		kakao: {
			main: '#FEE500',
			light: alpha('#FEE500', 0.5),
			dark: alpha('#FEE500', 0.8),
			contrastText: '#000000',
		},
	},
});

export default theme;
