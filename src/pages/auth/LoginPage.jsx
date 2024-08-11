import React, { useEffect } from 'react';
import axios from 'axios';
import { checkAuthPath } from '../../ApiPath';
import SocialMedia from '../../components/auth/SocialMedia';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const defaultTheme = createTheme({
	palette: {
		background: {
			default: '#efefef',
		},
	},
});

const checkAuth = async () => {
	const response = await axios
		.get(checkAuthPath, {
			withCredentials: true,
		})
		.then(response => {
			response.data === false ? null : (location.pathname = '/task-tracker/user');
		});
};

const LoginPage = () => {
	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 17,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: 4,
							boxShadow: 2,
							background: '#fff',
							borderRadius: 3,
						}}
					>
						<Box component='form' noValidate>
							<Box sx={{ paddingBottom: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
								<Typography component='h1' variant='h6' sx={{ fontSize: 25 }}>
									Вход в «Task tracker»
								</Typography>
							</Box>
							<SocialMedia />
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	);
};

export default LoginPage;
