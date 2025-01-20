import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';

import CreateTask from '../task/CreateTask';
import TaskMenu from '../task/TaskMenu';
import TaskManagement from '../task/TaskManagement';

const getContent = action => {
	if (action === 0) {
		return <CreateTask />;
	} else if (1 <= action <= 4) {
		return <TaskManagement obj={action} />;
	} else {
		throw new Error('Unknown action');
	}
};

export default function Checkout({ theme }) {
	const [activeAction, setAction] = useState(0);
	const [key, setKey] = useState(0);
	const navigate = useNavigate();

	const handleClickCheckout = value => {
		const params = new URLSearchParams({ category: value });
		navigate(`${location.pathname}?${params.toString()}`);
		setKey(key + 1);
	};

	const handleClickCreate = () => {
		setAction(0);
		setKey(0);
	};

	const handleClickOnTheDay = () => {
		setAction(1);
		setKey(1);
	};

	const handleClickOnOtherDays = () => {
		setAction(2);
		setKey(2);
	};

	const handleClickOnSomeDay = () => {
		setAction(3);
		setKey(3);
	};

	const handleClickCompleted = () => {
		setAction(4);
		setKey(4);
	};

	const handleClickIncomplete = () => {
		setAction(5);
		setKey(5);
	};

	return (
		<ThemeProvider>
			<CssBaseline />
			<Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
				<Grid
					item
					xs={12}
					sm={5}
					lg={2.5}
					sx={{
						flexDirection: 'column',
						backgroundColor: 'background.paper',
						borderRight: { sm: 'none', md: '1px solid' },
						borderColor: { sm: 'none', md: 'divider' },
						alignItems: 'start',
						pt: 2.5,
						px: 2.5,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
						}}
					>
						<TaskMenu
							create={handleClickCreate}
							onTheDay={handleClickOnTheDay}
							onOtherDays={handleClickOnOtherDays}
							onSomeDays={handleClickOnSomeDay}
							completed={handleClickCompleted}
							incomplete={handleClickIncomplete}
							checkout={handleClickCheckout}
						/>
					</Box>
				</Grid>
				<Grid
					item
					lg={9.5}
					sm={5}
					sx={{
						flexDirection: 'column',
						alignItems: 'start',
					}}
				>
					<Box
						key={key}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
						}}
					>
						{getContent(activeAction)}
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
