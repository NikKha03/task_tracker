import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { createTaskPath } from '../../ApiPath';

const createTask = async (header, date, time, comment) => {
	const dateArr = date.split('.');
	const fullDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]} ${time}`;
	const response = await axios
		.post(
			createTaskPath(),
			{
				header: header,
				datePlannedImplementation: fullDate,
				comment: comment,
			},
			{
				withCredentials: true,
			}
		)
		.catch(error => {
			console.error('Error fetching data: ', error);
		});
};

export default function CreateTask() {
	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		createTask(data.get('header'), data.get('date'), data.get('time'), data.get('comment'));
	};

	return (
		<form onSubmit={handleSubmitSave}>
			<Typography variant='h4'>Создать задачу</Typography>
			<List>
				<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
						<Typography sx={{ fontSize: 22 }}>🔠 Заголовок</Typography>
						<OutlinedInput id='header' name='header' />
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1, marginRight: 1 }}>
							<Typography sx={{ fontSize: 22 }}>🗓️ Дата выполнения</Typography>
							<OutlinedInput id='date' name='date' placeholder='дд.мм.гггг' />
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: 1, marginLeft: 1 }}>
							<Typography sx={{ fontSize: 22 }}>⏰ Время выполнения</Typography>
							<OutlinedInput id='time' name='time' placeholder='чч:мм' />
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
						<Typography sx={{ fontSize: 22 }}>🔔 Уведомления</Typography>
						<OutlinedInput id='notification' name='notification' placeholder='Для добавления нажмите enter' />
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
						<Typography sx={{ fontSize: 22 }}>📝 Комментарий</Typography>
						<TextField id='comment' name='comment' multiline rows={4} variant='filled' />
					</Box>
				</List>
			</List>
			<Button type='submitSave' variant='contained' color='success' sx={{ width: '100%' }}>
				Сохранить
			</Button>
		</form>
	);
}
