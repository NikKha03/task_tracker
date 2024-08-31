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

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const changeTask = async (taskId, header, comment, plannedImplDate) => {
	const response = await axios
		.put(
			changeTaskPath(taskId),
			{
				taskId: taskId,
				header: header,
				comment: comment,
				plannedImplDate: plannedImplDate,
			},
			{
				withCredentials: true,
			}
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

const deleteTask = async taskId => {
	const response = await axios
		.delete(deleteTaskPath(taskId), {
			withCredentials: true,
		})
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

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
	console.log(tasks);
	const [tasksIsEmpty, setTasksIsEmpty] = useState(false);
	const [triggerEffect, setTriggerEffect] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);

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
			requestCode();
		}
		requestCode();
	}, [triggerEffect]);

	const getTasksIncomplete = async () => {
		const response = await axios
			.get(tasksIncomplete, {
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
			.get(tasksOnTheDay, {
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
			.get(tasksOnOtherDays, {
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
			.get(tasksOnSomeday, {
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
			.get(allCompletedTasks, {
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

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const fullDate = data.get('dateTimeOfTask');
		let [date, time] = fullDate.split(' ');
		if (time === undefined) time = '00:00';
		const [day, month, year] = date.split('.');

		changeTask(selectedTaskId, data.get('header'), data.get('comment'), `${year}-${month}-${day} ${time}`);
		setTriggerEffect(true);
	};

	const handleClickDelete = () => {
		deleteTask(selectedTaskId);
		setTriggerEffect(true);
	};

	return (
		<React.Fragment>
			<List disablePadding sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				{tasksIsEmpty ? <EmptyPageMassage command={obj} /> : null}
				{tasks.map(task => (
					<Box key={task.taskId} sx={{ width: '100%' }}>
						<TaskList status={task.taskStatus} tasks={tasks} task={task} click={handleClick} changeOnNotChecked={handleCheckboxNotChecked} changeOnChecked={handleCheckboxChecked} />
						{selectedTaskId === task.taskId && (
							<form onSubmit={handleSubmitSave}>
								<List sx={{ marginLeft: 6.2, marginRight: 6.2 }}>
									<Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
										<Button type='submitSave' sx={{ border: 2, borderColor: 'green', borderRadius: 1, marginRight: 1 }}>
											<SaveIcon sx={{ fontSize: 30, color: 'green' }} />
										</Button>
										<Button onClick={() => handleClickDelete()} sx={{ border: 2, borderColor: 'red', borderRadius: 1, marginLeft: 1 }}>
											<DeleteIcon sx={{ fontSize: 30, color: 'red' }} />
										</Button>
									</Stack>
									<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
										<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1 }}>
											<Typography sx={{ fontSize: 22 }}>🔠 Заголовок</Typography>
											<OutlinedInput id='header' name='header' defaultValue={task.header} />
										</Box>
										<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1 }}>
											<Typography sx={{ fontSize: 22 }}>🗓️ Выполнить</Typography>
											<OutlinedInput id='dateTimeOfTask' name='dateTimeOfTask' defaultValue={dateFormatter(task.plannedImplDate)} />
										</Box>
										<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
											<Typography sx={{ fontSize: 22 }}>📝 Комментарий</Typography>
											<TextField id='comment' name='comment' multiline rows={4} defaultValue={task.comment} variant='filled' />
										</Box>
									</List>
								</List>
							</form>
						)}
					</Box>
				))}
			</List>
		</React.Fragment>
	);
}

const dateFormatter = fullDate => {
	if (fullDate === '' || fullDate === null) {
		return '';
	}

	let [date, time] = fullDate.split(' ');
	const [year, month, day] = date.split('-');

	if (time === '00:00') {
		return `${day}.${month}.${year}`;
	}

	return `${day}.${month}.${year} ${time}`;
};
