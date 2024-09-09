import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getCategoryPath } from '../../ApiPath';

export default function Category({ change, value }) {
	const [category, setCategory] = useState([]);

	const getCategory = async () => {
		const response = await axios
			.get(getCategoryPath, {
				withCredentials: true,
			})
			.then(response => {
				setCategory(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	useEffect(() => {
		getCategory();
	}, []);

	return (
		<FormControl>
			<Select sx={{ fontSize: 17 }} value={value} onChange={change} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
				<MenuItem sx={{ fontSize: 17 }} value='null'>
					Нет
				</MenuItem>
				{category.map((item, index) => (
					<MenuItem sx={{ fontSize: 17 }} key={index + 1} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
