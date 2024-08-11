import React from 'react';
import Typography from '@mui/material/Typography';

export default function EmptyPageMassage({ command }) {
	switch (command) {
		case 1:
			return <Typography variant='h3'>На сегодня нет задач</Typography>;
		case 2:
			return <Typography variant='h3'>Нет задач в планах</Typography>;
		case 3:
			return <Typography variant='h3'>Нет отложенных задач</Typography>;
		case 4:
			return <Typography variant='h3'>Нет завершенных задач</Typography>;
		case 5:
			return <Typography variant='h3'>Нет просроченных задач</Typography>;
	}
}
