import React from 'react';
import { oAuth2Yandex } from '../../ApiPath';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import yandexId from '../../../img/yaID.png';

const SocialMedia = () => {
	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<img style={{ height: '23%', width: '23%' }} src={yandexId} alt='YandexID' />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0.5, paddingBottom: 2.5 }}>
				<Typography component='h2' variant='h6' sx={{ fontSize: 20, width: '100%', textAlign: 'center' }}>
					Войдите с Яндекс ID
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Button
					type='submit'
					variant='contained'
					sx={{
						fontSize: 20,
						width: '100%',
						textAlign: 'center',
						borderRadius: 4,
						backgroundColor: '#151719',
						'&:hover': {
							backgroundColor: '#2c3136',
						},
					}}
					href={oAuth2Yandex}
				>
					Войти в аккаунт
				</Button>
			</Box>
		</Box>
	);
};

export default SocialMedia;
