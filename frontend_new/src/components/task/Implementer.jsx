import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { withEmotionCache } from '@emotion/react';

const selectStyle = { width: '100%', height: '2.25rem', backgroundColor: '#ffffff', color: '#4f4f4f' };

export default function Implementer({ implementer, setImplementer }) {
	const { project, usernameAndName } = useContext(AppContext);
	const { user } = useContext(AuthContext);

	const handleChange = event => {
		setImplementer(event.target.value);
	};

	return window.location.pathname === '/list' ? (
		<>
			<Select disabled style={selectStyle} value={user.name} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }} size='small'>
				{console.log(user.fullName)}
				<MenuItem value={user.name}>{user.fullName}</MenuItem>
			</Select>
		</>
	) : (
		<>
			<Select style={selectStyle} displayEmpty value={implementer} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }} size='small'>
				<MenuItem value=''>Нет</MenuItem>
				{console.log(window.location.pathname)}
				{project.team.map(item => (
					<MenuItem key={item.id} value={item.username}>
						{usernameAndName[item.username]}
					</MenuItem>
				))}
			</Select>
		</>
	);
}
