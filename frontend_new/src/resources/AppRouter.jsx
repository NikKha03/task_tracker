import React from 'react';
import { Routes, Route } from 'react-router-dom';

import StartPage from '../pages/user/StartPage';
import LoginPage from '../pages/auth/LoginPage';
import Profile from '../pages/user/Profile';
import ListTasks from '../pages/task/ListTasks';
import KanbanBoardsPage from '../pages/task/KanbanBoardsPage';

const AppRouter = () => {
	const user = { name: 'Халимендик Николай' };
	const projects = [
		{ name: 'Тестовый проект 1' },
		{ name: 'Тестовый проект 2' },
		{ name: 'Тестовый проект 3' },
		{ name: 'Тестовый проект 4' },
		{ name: 'Тестовый проект 5' },
		{ name: 'Тестовый проект 6' },
		{ name: 'Тестовый проект 7' },
	];

	return (
		<Routes>
			<Route path='/' element={<StartPage />} />
			<Route path='/auth/login' element={<LoginPage />} />
			<Route path='/list' element={<ListTasks user={user} projects={projects} />} />
			<Route path='/board' element={<KanbanBoardsPage user={user} projects={projects} />} />
			<Route path='/profile' element={<Profile />} />
		</Routes>
	);
};

export default AppRouter;
