import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const setDataGroup = (tasks, task) => {
	if (task === tasks[0] || (task !== tasks[0] && tasks[tasks.indexOf(task) - 1].executionDate.substring(0, 10) !== task.executionDate.substring(0, 10))) {
		return (
			<Typography variant='h2' sx={{ fontSize: 22, marginBottom: 2 }}>
				{task.executionDate.substring(0, 10)}
			</Typography>
		);
	}
};

export default function CompletedTask({ tasks, task, checkedTaskId, click, change }) {
	let borderColor;

	if (task.datePlannedImplementation === null) {
		borderColor = 'green';
	} else {
		const dataPlannedImplementation = task.datePlannedImplementation.substring(0, 10);
		const dataExecution = task.executionDate.substring(0, 10);

		dataPlannedImplementation === dataExecution || new Date() < new Date(dataPlannedImplementation) ? (borderColor = 'green') : (borderColor = 'orange');
	}

	return (
		<>
			{setDataGroup(tasks, task)}
			<Stack sx={{ alignItems: 'center', border: 1, borderRadius: 2, borderColor: { borderColor }, marginBottom: 2, padding: 1 }} direction='row'>
				<FormControlLabel control={<Checkbox defaultChecked onChange={() => change(task.taskId)} color='success' />} />
				<Typography onClick={() => click(task.taskId)} variant='h3' sx={{ cursor: 'pointer', fontSize: 22 }}>
					{task.header}
				</Typography>
			</Stack>
		</>
	);
}
