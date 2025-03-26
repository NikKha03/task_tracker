import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import Profile from '../pages/user/Profile';
import MainPage from '../pages/task/MainPage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/auth/login' element={<LoginPage />} />
			<Route path='/task-panel' element={<MainPage />} />
			<Route path='/profile' element={<Profile />} />
		</Routes>
	);
};

export default AppRouter;
