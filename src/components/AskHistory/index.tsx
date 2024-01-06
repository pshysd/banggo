import { ICounseling, IUser } from '@typings/db';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

function AskHistory() {
	const { data: user } = useSWR<IUser>(`/api/users`, fetcher);
	const { data: counselings } = useSWR<ICounseling[]>(`/api/counselings/${user?.id}`, fetcher);

	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
	};

	return (
		<Box width={'20%'} sx={{ border: '1px solid black' }}>
			<List>
				{counselings ? (
					counselings.map((counseling, index) => (
						<ListItemButton selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
							<ListItemText primary={counseling.title} />
						</ListItemButton>
					))
				) : (
					<ListItemText>작성한 고민이 존재하지 않습니다.</ListItemText>
				)}
			</List>
		</Box>
	);
}

export default AskHistory;
