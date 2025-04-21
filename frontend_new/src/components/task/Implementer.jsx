import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Implementer({ implementer, setImplementer }) {
	const { project, usernameAndName } = useContext(AppContext);
	console.log(usernameAndName);

	const handleChange = event => {
		setImplementer(event.target.value);
	};

	return (
		<Select style={{ width: '100%', height: '2.25rem', backgroundColor: '#ffffff', color: '#4f4f4f' }} value={implementer} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} size='small'>
			<MenuItem value=''>Нет</MenuItem>
			{project.team.map(item => (
				<MenuItem key={item.id} value={item.username}>
					{usernameAndName[item.username]}
				</MenuItem>
			))}
		</Select>
	);
}
