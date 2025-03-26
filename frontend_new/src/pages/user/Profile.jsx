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
			{userInfoData === null ? null : (
				<form onSubmit={handleSubmitSave}>
					<FormGrid item xs={12} md={6}>
						<FormLabel htmlFor='first-name' required>
							Имя
						</FormLabel>
						<OutlinedInput id='first-name' name='first-name' type='name' defaultValue={userInfoData.firstName} />
					</FormGrid>
					<FormGrid item xs={12} md={6}>
						<FormLabel htmlFor='last-name' required>
							Фамилия
						</FormLabel>
						<OutlinedInput id='last-name' name='last-name' type='last-name' defaultValue={userInfoData.lastName} />
					</FormGrid>
					<FormGrid item xs={12}>
						<FormLabel htmlFor='email' required>
							Email
						</FormLabel>
						<OutlinedInput id='email' name='email' type='email' defaultValue={userInfoData.email} />
					</FormGrid>
					<FormGrid item xs={12}>
						<FormLabel htmlFor='Tg' required>
							Tg
						</FormLabel>
						<OutlinedInput id='Tg' name='Tg' type='Tg' defaultValue={userInfoData.tg} />
					</FormGrid>

					<Button type='submitSave' variant='contained' color='success' sx={{ width: '100%', marginTop: 4 }}>
						Сохранить
					</Button>
				</form>
			)}
		</>
	);
}
