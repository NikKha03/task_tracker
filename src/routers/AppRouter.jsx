import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import UserPage from '../pages/user/UserPage';
import UserInfo from '../pages/user/UserInfo';

const AppRouter = () => {
	const isAuth = true;
	return (
		<Routes>
			<Route path='/' element={''} />
			<Route path='/task-tracker/auth/login' element={<LoginPage />} />
			<Route path='/task-tracker/user/*' element={<UserPage />} />
			<Route path='/task-tracker/profile' element={<UserInfo />} />
		</Routes>
	);
};

export default AppRouter;
