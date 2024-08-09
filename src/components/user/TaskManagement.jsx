import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiAllTasks, apiChangeTask, apiDeleteTask, apiChangeTaskStatusOnCompleted, apiTasksOnTheDay, apiTasksOnOtherDays, apiTasksOnSomeday, apiAllCompletedTasks } from '../../ApiPath';

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
import { green } from '@mui/material/colors';

const changeTask = async (taskId, header, comment, datePlannedImplementation) => {
	const response = await axios
		.put(
			apiChangeTask(taskId),
			{
				taskId: taskId,
				header: header,
				comment: comment,
				datePlannedImplementation: datePlannedImplementation,
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
		.delete(apiDeleteTask(taskId), {
			withCredentials: true,
		})
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

const changeTaskStatusOnCompleted = async taskId => {
	const response = await axios
		.put(
			apiChangeTaskStatusOnCompleted(taskId),
			{}
			// {
			// 	withCredentials: true,
			// }
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

export default function TaskManagement({ obj }) {
	const [tasks, setTasks] = useState([]);
	const [triggerEffect, setTriggerEffect] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [isChecked, setIsChecked] = useState(null);

	const getUserTasks = async () => {
		const response = await axios
			.get(apiAllTasks(), {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnTheDay = async () => {
		const response = await axios
			.get(apiTasksOnTheDay(), {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnOtherDays = async () => {
		const response = await axios
			.get(apiTasksOnOtherDays(), {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getTasksOnSomeday = async () => {
		const response = await axios
			.get(apiTasksOnSomeday(), {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const getCompletedTasks = async () => {
		const response = await axios
			.get(apiAllCompletedTasks(), {
				withCredentials: true,
			})
			.then(response => {
				setTasks(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

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
		}
	};

	useEffect(() => {
		if (triggerEffect) {
			requestCode();
			setTriggerEffect(false);
		}

		requestCode();
	}, [triggerEffect]);

	const handleCheckboxChange = taskId => {
		if (isChecked === taskId) {
			setIsChecked(null);
		} else {
			setIsChecked(taskId);
			changeTaskStatusOnCompleted(taskId);
		}
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
		changeTask(selectedTaskId, data.get('header'), data.get('comment'), data.get('dateTimeOfTask'));
		setTriggerEffect(true);
	};

	const handleClickDelete = () => {
		deleteTask(selectedTaskId);
		setTriggerEffect(true);
	};

	return (
		<React.Fragment>
			<List disablePadding sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				{tasks.map(task => (
					<Box key={task.taskId} sx={{ width: '100%' }}>
						{task.datePlannedImplementation !== null &&
						task.taskStatus !== 'COMPLETED' &&
						(task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].datePlannedImplementation.substring(0, 10) !== task.datePlannedImplementation.substring(0, 10))) ? (
							<Typography variant='h2' sx={{ fontSize: 22, marginBottom: 2 }}>
								{task.datePlannedImplementation.substring(0, 10)}
							</Typography>
						) : null}
						{task.taskStatus === 'COMPLETED' && (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].executionDate.substring(0, 10) !== task.executionDate.substring(0, 10))) ? (
							<Typography variant='h2' sx={{ fontSize: 22, marginBottom: 2 }}>
								{task.executionDate.substring(0, 10)}
							</Typography>
						) : null}

						<Stack sx={{ alignItems: 'center', border: 1, borderRadius: 2, borderColor: 'blue', marginBottom: 2, padding: 1 }} direction='row'>
							<FormControlLabel control={<Checkbox checked={isChecked === task.taskId ? true : false} onChange={() => handleCheckboxChange(task.taskId)} color='success' />} />
							<Typography onClick={() => handleClick(task.taskId)} variant='h3' sx={{ cursor: 'pointer', fontSize: 22 }}>
								{task.header}
							</Typography>
						</Stack>
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
											<Typography variant='caption' sx={{ fontSize: 20 }}>
												🔠 Заголовок
											</Typography>
											<OutlinedInput id='header' name='header' defaultValue={task.header} />
										</Box>
										<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1 }}>
											<Typography sx={{ fontSize: 22 }}>🗓️ Дата выполнения</Typography>
											<OutlinedInput id='dateTimeOfTask' name='dateTimeOfTask' defaultValue={task.datePlannedImplementation} />
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
