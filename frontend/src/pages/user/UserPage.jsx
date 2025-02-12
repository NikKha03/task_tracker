import React, { useState } from 'react';

import Checkout from '../../components/user/Checkout';
import Navbar from '../../components/user/Navbar';
import Root from '../../components/root/Root';
import ToggleColorMode from '../../components/theme/ToggleColorMode';
import getCheckoutTheme from '../../components/theme/getCheckoutTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserPage = () => {
	const [mode, setMode] = useState('dark');
	const checkoutTheme = createTheme(getCheckoutTheme(mode));

	const toggleColorMode = () => {
		setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
	};

	return (
		<>
			<Root />
			<Navbar mode={<ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />} />
			<Checkout theme={checkoutTheme} />
		</>
	);
};

export default UserPage;
