import { ICounseling, IUser } from '@typings/db';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import CloseIcon from '@mui/icons-material/Close';
import loadable from '@loadable/component';
import axios from 'axios';

const Loading = loadable(() => import('@pages/Loading'));

function AskHistory() {
	const { data: user } = useSWR<IUser>(`/api/auth`, fetcher, {
		dedupingInterval: 1000 * 60,
	});

	const { data: counselings, mutate: mutateCounselings } = useSWR<ICounseling[] | null>(`/api/users/counselings/${user?.id}`, fetcher, {
		dedupingInterval: 0,
	});

	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
	};

	const handleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const onDeleteButton = useCallback(
		async (id: number) => {
			try {
				const result = await axios.delete(`/api/counselings/${id}`, { withCredentials: true });

				if (result) {
					mutateCounselings();
					handleOpen();
				}
			} catch (e) {
				const err = e as Error;
				console.error(err);
				alert(err.message);
			}
		},
		[mutateCounselings, handleOpen]
	);

	if (counselings === undefined) {
		return <Loading />;
	}

	return (
		<Box width={'20%'} borderRight={'2px solid grey'}>
			{counselings ? (
				counselings.map((counseling, index) => (
					<List>
						<ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
							<ListItemText primary={counseling.title} />
							<IconButton onClick={handleOpen}>
								<CloseIcon />
							</IconButton>
							<Dialog open={open} onClose={handleOpen}>
								<DialogTitle>{'고민 삭제하기'}</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">확인을 누르시면 이후에 복구가 어렵습니다.</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleOpen}>아니오</Button>
									<Button onClick={() => onDeleteButton(counseling.id)} autoFocus>
										예
									</Button>
								</DialogActions>
							</Dialog>
						</ListItemButton>
					</List>
				))
			) : (
				<Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
					<Typography component={'p'}>작성한 고민이 존재하지 않습니다.</Typography>
				</Box>
			)}
		</Box>
	);
}

export default AskHistory;
