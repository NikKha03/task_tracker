import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	changeTaskPath,
	deleteTaskPath,
	changeTaskPathStatusOnCompletedPath,
	changeTaskPathStatusOnInProgressPath,
	tasksOnTheDay,
	tasksOnOtherDays,
	tasksOnSomeday,
	allCompletedTasks,
	tasksIncomplete,
} from '../../ApiPath';
import EmptyPageMassage from './EmptyPageMassage';
import TaskList from './TaskList';
import ChangeTask from './ChangeTask';
import { dateChange, showDate } from '../../utils/DateUtils';
import Category from './Category';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import zIndex from '@mui/material/styles/zIndex';

const changeTaskPathStatusOnCompleted = async taskId => {
	const response = await axios
		.put(
			changeTaskPathStatusOnCompletedPath(taskId),
			{},
			{
				withCredentials: true,
			}
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

const changeTaskPathStatusOnInProgress = async taskId => {
	const response = await axios
		.put(
			changeTaskPathStatusOnInProgressPath(taskId),
			{},
			{
				withCredentials: true,
			}
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

export default function TaskManagement({ obj }) {
	const [tasks, setTasks] = useState([]);
	const [tasksIsEmpty, setTasksIsEmpty] = useState(false);
	const [triggerEffect, setTriggerEffect] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const url = new URL(window.location.href);
	const category = url.searchParams.get('category');
	const [selectedValue, setSelectedValue] = useState(category);

	const requestCode = () => {
		switch (obj) {
			case 1:
				return getTasksOnTheDay();
			case 2:
				return getTasksOnOtherDays();
			case 3:
				return getTasksOnSomeday();
			case 4:
				return getCompletedTasks();
			case 5:
				return getTasksIncomplete();
		}
	};

	useEffect(() => {
		if (triggerEffect) {
			setTriggerEffect(false);
		}

		requestCode();
	}, [triggerEffect]);

	const getTasksIncomplete = async () => {
		const response = await axios
			.get(tasksIncomplete + `?category=${category}`, {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
				if (response.data.length === 0) setTasksIsEmpty(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnTheDay = async () => {
		const response = await axios
			.get(tasksOnTheDay + `?category=${category}`, {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
				if (response.data.length === 0) setTasksIsEmpty(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnOtherDays = async () => {
		const response = await axios
			.get(tasksOnOtherDays + `?category=${category}`, {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
				if (response.data.length === 0) setTasksIsEmpty(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnSomeday = async () => {
		const response = await axios
			.get(tasksOnSomeday + `?category=${category}`, {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
				if (response.data.length === 0) setTasksIsEmpty(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getCompletedTasks = async () => {
		const response = await axios
			.get(allCompletedTasks + `?category=${category}`, {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
				if (response.data.length === 0) setTasksIsEmpty(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const handleCheckboxChecked = taskId => {
		changeTaskPathStatusOnCompleted(taskId);
		setTriggerEffect(true);
	};

	const handleCheckboxNotChecked = taskId => {
		changeTaskPathStatusOnInProgress(taskId);
		setTriggerEffect(true);
	};

	const handleClick = taskId => {
		if (selectedTaskId === taskId) {
			setSelectedTaskId(null);
		} else {
			setSelectedTaskId(taskId);
		}
	};

	return (
		<React.Fragment>
			<List disablePadding>
				{tasksIsEmpty ? <EmptyPageMassage command={obj} /> : null}
				{tasks.map(task => (
					<Grid container>
						<Grid
							item
							xs={12}
							lg={6}
							sx={{
								display: 'flex',
								borderRight: { sm: 'none', md: '1px solid' },
								borderColor: { sm: 'none', md: 'divider' },
								flexDirection: 'column',
								alignItems: 'flex-start',
								pt: 2.5,
								px: 5,
							}}
						>
							<Box key={task.taskId} sx={{ flexDirection: 'column', width: '100%' }}>
								<TaskList status={task.taskStatus} tasks={tasks} task={task} click={handleClick} changeOnNotChecked={handleCheckboxNotChecked} changeOnChecked={handleCheckboxChecked} />
							</Box>
						</Grid>
						<Grid
							item
							lg={6}
							sx={{
								width: '100%',
								// height: { xs: '100%', sm: '100dvh' },
							}}
						>
							<Box
								// sx={{ height: { xs: '100%', sm: '100dvh' } }}
								sx={{
									width: '50%',
									position: 'absolute',
									top: 0,
									right: 0,
								}}
							>
								<ChangeTask task={task} selectedValue={selectedValue} selectedTaskId={selectedTaskId} setTriggerEffect={setTriggerEffect} setSelectedValue={setSelectedValue} />
							</Box>
						</Grid>
					</Grid>
				))}
			</List>
		</React.Fragment>
	);
}
