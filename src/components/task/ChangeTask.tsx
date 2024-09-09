import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { changeTaskPath, deleteTaskPath } from '../../ApiPath';

import { dateChange, showDate } from '../../utils/DateUtils';
import Category from './Category';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const changeTask = async (taskId, header, comment, plannedImplDate, category) => {
	const response = await axios
		.put(
			changeTaskPath(taskId),
			{
				header: header,
				comment: comment,
				category: category,
				plannedImplDate: dateChange(plannedImplDate),
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

export default function ChangeTask({ task, selectedValue, selectedTaskId, setTriggerEffect, setSelectedValue }) {
	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		changeTask(selectedTaskId, data.get('header'), data.get('comment'), data.get('dateTimeOfTask'), selectedValue);
		setTriggerEffect(true);
	};

	const handleClickDelete = () => {
		deleteTask(selectedTaskId);
		setTriggerEffect(true);
	};

	const handleChangeCategory = event => {
		setSelectedValue(event.target.value);
		setTriggerEffect(true);
	};

	return (
		<>
			{selectedTaskId === task.taskId && (
				<form onSubmit={handleSubmitSave}>
					<List sx={{ top: 10, marginLeft: 5, marginRight: 5, marginBottom: 1.5 }}>
						<Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
							<Button type='submitSave' size='small' sx={{ border: 1.5, borderColor: 'green', borderRadius: 1, marginRight: 1 }}>
								<SaveIcon sx={{ fontSize: 27, color: 'green' }} />
							</Button>
							<Button onClick={() => handleClickDelete()} size='small' sx={{ border: 1.5, borderColor: 'red', borderRadius: 1, marginLeft: 1 }}>
								<DeleteIcon sx={{ fontSize: 27, color: 'red' }} />
							</Button>
						</Stack>
						<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
								<Typography sx={{ fontSize: 21 }}>🔠 Заголовок</Typography>
								<OutlinedInput id='header' name='header' defaultValue={task.header} sx={{ fontSize: 17 }} />
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
								<Typography sx={{ fontSize: 21 }}>📂 Категория</Typography>
								<Category change={handleChangeCategory} value={selectedValue} />
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
								<Typography sx={{ fontSize: 21 }}>🗓️ Выполнить</Typography>
								<OutlinedInput id='dateTimeOfTask' name='dateTimeOfTask' defaultValue={showDate(task.plannedImplDate)} sx={{ fontSize: 17 }} />
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
								<Typography sx={{ fontSize: 21 }}>📝 Комментарий</Typography>
								<TextField
									sx={{
										'.MuiInputBase-input': { fontSize: 17 },
									}}
									id='comment'
									name='comment'
									multiline
									rows={4}
									defaultValue={task.comment}
									variant='filled'
								/>
							</Box>
						</List>
					</List>
				</form>
			)}
		</>
	);
}
