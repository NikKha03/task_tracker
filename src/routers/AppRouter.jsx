import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import UserPage from '../pages/user/UserPage';

const AppRouter = () => {
	const isAuth = true;
	return (
		<Routes>
			<Route path='/' element={''} />
			<Route path='/task-tracker/auth/login' element={<LoginPage />} />
			<Route path='/task-tracker/user/*' element={<UserPage />} />
		</Routes>
	);
};

export default AppRouter;
