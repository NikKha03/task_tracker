import React from 'react';
import Typography from '@mui/material/Typography';

export default function EmptyPageMassage({ command }) {
	switch (command) {
		case 1:
			return (
				<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 4, marginRight: 4 }}>
					На сегодня нет задач
				</Typography>
			);
		case 2:
			return (
				<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 4, marginRight: 4 }}>
					Нет задач в планах
				</Typography>
			);
		case 3:
			return (
				<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 4, marginRight: 4 }}>
					Нет отложенных задач
				</Typography>
			);
		case 4:
			return (
				<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 4, marginRight: 4 }}>
					Нет завершенных задач
				</Typography>
			);
		case 5:
			return (
				<Typography variant='h4' sx={{ marginTop: 2, marginLeft: 4, marginRight: 4 }}>
					Нет просроченных задач
				</Typography>
			);
	}
}
