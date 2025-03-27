import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { userInfoPath, changeUserInfoPath } from '../../resources/ApiPath';

import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
}));

export default function Profile() {
	const [userInfoData, setUserInfoData] = useState(null);

	const getUserInfo = async () => {
		const response = await axios
			.get(userInfoPath, {
				withCredentials: true,
			})
			.then(response => {
				setUserInfoData(response.data);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	const changeUserInfo = async (firstName, lastName, email, tg) => {
		const response = await axios
			.put(
				changeUserInfoPath,
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
					tg: tg,
				},
				{
					withCredentials: true,
				}
			)
			.catch(error => {
				console.error('Error fetching data: ', error);
			});
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		changeUserInfo(data.get('first-name'), data.get('last-name'), data.get('email'), data.get('Tg'));
	};

	return (
		<>
			<h1>Profile</h1>
		</>
	);
}
