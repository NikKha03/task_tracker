import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

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

	const handleClickCreate = () => {
		setAction(0);
	};

	const handleClickOnTheDay = () => {
		setAction(1);
	};

	const handleClickOnOtherDays = () => {
		setAction(2);
	};

	const handleClickOnSomeDay = () => {
		setAction(3);
	};

	const handleClickCompleted = () => {
		setAction(4);
	};

	const handleClickIncomplete = () => {
		setAction(5);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
				<Grid
					item
					xs={12}
					sm={5}
					lg={4}
					sx={{
						display: { xs: 'none', md: 'flex' },
						flexDirection: 'column',
						backgroundColor: 'background.paper',
						borderRight: { sm: 'none', md: '1px solid' },
						borderColor: { sm: 'none', md: 'divider' },
						alignItems: 'start',
						pt: 1,
						px: 1,
						gap: 4,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexGrow: 1,
							width: '100%',
							maxWidth: 500,
						}}
					>
						<TaskMenu
							create={handleClickCreate}
							onTheDay={handleClickOnTheDay}
							onOtherDays={handleClickOnOtherDays}
							onSomeDays={handleClickOnSomeDay}
							completed={handleClickCompleted}
							incomplete={handleClickIncomplete}
						/>
					</Box>
				</Grid>
				<Grid
					item
					sm={12}
					md={7}
					lg={8}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '100%',
						width: '100%',
						backgroundColor: { xs: 'transparent', sm: 'background.default' },
						alignItems: 'start',
						pt: { xs: 2, sm: 4 },
						px: { xs: 2, sm: 10 },
						gap: { xs: 4, md: 8 },
					}}
				>
					<Box
						key={activeAction}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexGrow: 1,
							width: '100%',
							maxWidth: { sm: '100%', md: 600 },
							maxHeight: '720px',
							gap: { xs: 5, md: 'none' },
						}}
					>
						{getContent(activeAction)}
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
