import Typography from '@mui/material/Typography';

export default function GroupByDate({ tasks, task }) {
	if (task.taskStatus === 'IN_PROGRESS' || task.taskStatus === 'AWAITING_COMPLETION') {
		if (task.deadline === null) {
			return null;
		} else if (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].deadline.substring(0, 10) !== task.deadline.substring(0, 10))) {
			const [year, month, day] = task.deadline.substring(0, 10).split('-');
			return (
				<Typography variant='h2' sx={{ color: '#ffffff', fontSize: 20, marginBottom: 1 }}>
					{`${day}.${month}.${year}`}
				</Typography>
			);
		}
	}

	if (task.taskStatus === 'COMPLETED') {
		if (task.executionDate === null) {
			return null;
		} else if (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].executionDate.substring(0, 10) !== task.executionDate.substring(0, 10))) {
			const [year, month, day] = task.executionDate.substring(0, 10).split('-');
			return (
				<Typography variant='h2' sx={{ color: '#ffffff', fontSize: 20, marginBottom: 1 }}>
					{`${day}.${month}.${year}`}
				</Typography>
			);
		}
	}
}
