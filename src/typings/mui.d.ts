import IconButton from '@mui/material/IconButton';
declare module '@mui/material/styles' {
	interface Palette {
		black: Palette['primary'];
		gray: Palette['primary'];
		white: Palette['primary'];
		teal: Palette['primary'];
		kakao: Palette['primary'];
	}

	interface PaletteOptions {
		black?: PaletteOptions['primary'];
		gray?: PaletteOptions['primary'];
		white?: PaletteOptions['primary'];
		teal?: PaletteOptions['primary'];
		kakao?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface BoxPropsColorOverrides {
		black: true;
		gray: true;
		white: true;
		teal: true;
		kakao: true;
	}
}

declare module '@mui/material/IconButton' {
	interface IconButtonPropsColorOverrides {
		black: true;
		gray: true;
		white: true;
		teal: true;
		kakao: true;
	}
}
export {};
