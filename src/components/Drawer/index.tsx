import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/MenuRounded';
import { useNavigate } from 'react-router-dom';

type Anchor = 'right';

const Menu = [
	{ title: '상담기록', link: '/ask' },
	{ title: '질문하기', link: '/question' },
];

export default function TemporaryDrawer() {
	const navigate = useNavigate();

	const [state, setState] = React.useState({
		right: false,
	});

	const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	// Drawer 오픈됐을 시 나오는 메뉴
	const list = (anchor: Anchor) => (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer('right', false)} onKeyDown={toggleDrawer('right', false)}>
			<List>
				{Menu.map((item, index) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={item.title} onClick={() => navigate(item.link)} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<React.Fragment key={'right'}>
				<Button onClick={toggleDrawer('right', true)}>
					<MenuIcon />
				</Button>
				<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
					{list('right')}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
