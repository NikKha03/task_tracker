import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StartPage from '../pages/user/StartPage';
import LoginPage from '../pages/auth/LoginPage';
import Profile from '../pages/user/Profile';
import KanbanBoardsPage from '../pages/task/KanbanBoardsPage';

const AppRouter = () => {
	const user = { name: 'Халимендик Николай' };

	return (
		<Routes>
			<Route path='/' element={<StartPage />} />
			<Route path='/auth/login' element={<LoginPage />} />
			<Route path='/task-panel' element={<KanbanBoardsPage user={user} />} />
			<Route path='/profile' element={<Profile />} />
		</Routes>
	);
};

export default AppRouter;
