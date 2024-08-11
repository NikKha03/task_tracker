import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkAuthPath } from '../../ApiPath';
import Checkout from '../../components/user/Checkout';
import Navbar from '../../components/user/Navbar';
import ToggleColorMode from '../../components/theme/ToggleColorMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getCheckoutTheme from '../../components/theme/getCheckoutTheme';

const checkAuth = async () => {
	const response = await axios
		.get(checkAuthPath, {
			withCredentials: true,
		})
		.then(response => {
			response.data === true ? null : (location.pathname = '/task-tracker/auth/login');
		});
};

const UserPage = () => {
	const [mode, setMode] = useState('dark');
	const checkoutTheme = createTheme(getCheckoutTheme(mode));

	useEffect(() => {
		checkAuth();
	}, []);

	const toggleColorMode = () => {
		setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
	};

	return (
		<>
			<Navbar mode={<ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />} />
			<Checkout theme={checkoutTheme} />
		</>
	);
};

export default UserPage;
