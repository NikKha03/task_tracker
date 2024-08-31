import React from 'react';
import Typography from '@mui/material/Typography';

export default function DataGroup({ tasks, task }) {
	if (task.executionDate === null && task.plannedImplDate === null) {
		return null;
	}

	if (task.taskStatus === 'IN_PROGRESS') {
		if (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].plannedImplDate.substring(0, 10) !== task.plannedImplDate.substring(0, 10))) {
			const [year, month, day] = task.plannedImplDate.substring(0, 10).split('-');
			return (
				<Typography variant='h2' sx={{ fontSize: 22, marginBottom: 2 }}>
					{`${day}.${month}.${year}`}
				</Typography>
			);
		}
	}

	if (task.taskStatus === 'COMPLETED') {
		if (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].executionDate.substring(0, 10) !== task.executionDate.substring(0, 10))) {
			const [year, month, day] = task.executionDate.substring(0, 10).split('-');
			return (
				<Typography variant='h2' sx={{ fontSize: 22, marginBottom: 2 }}>
					{`${day}.${month}.${year}`}
				</Typography>
			);
		}
	}
}
