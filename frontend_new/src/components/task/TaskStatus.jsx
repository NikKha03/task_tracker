import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Implementer({ status, setStatus }) {
	const handleChange = event => {
		setStatus(event.target.value);
	};

	return (
		<Select style={{ width: '100%', height: '2.25rem', backgroundColor: '#ffffff', color: '#4f4f4f' }} value={status} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} size='small'>
			<MenuItem value='AWAITING_COMPLETION'>Нужно сделать</MenuItem>

			<MenuItem value='IN_PROGRESS'>В работе</MenuItem>

			<MenuItem value='COMPLETED'>Готово</MenuItem>
		</Select>
	);
}
