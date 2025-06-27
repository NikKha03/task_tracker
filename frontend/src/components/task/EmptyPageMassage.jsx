import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const style = { color: '#ffffff', marginTop: 1, marginLeft: 3 };

export default function EmptyPageMassage() {
	let [searchParams, setSearchParams] = useSearchParams();
	const statusParam = searchParams.get('status');
	// console.log(statusParam);

	switch (statusParam) {
		case 'awaitingCompletionTasks':
			return (
				<Typography variant='h4' sx={style}>
					У вас нет запланированных задач
				</Typography>
			);
		case 'withoutDateImplTasks':
			return (
				<Typography variant='h4' sx={style}>
					У вас нет задач с неуказанной датой выполнения
				</Typography>
			);
		case 'inProgressTasks':
			return (
				<Typography variant='h4' sx={style}>
					У вас нет задач в работе
				</Typography>
			);
		case 'incompleteTasks':
			return (
				<Typography variant='h4' sx={style}>
					У вас нет просроченных задач
				</Typography>
			);
		case 'completedTasks':
			return (
				<Typography variant='h4' sx={style}>
					У вас нет завершенных задач
				</Typography>
			);
	}
}
