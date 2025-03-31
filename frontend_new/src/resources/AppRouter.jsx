import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import StartPage from '../pages/user/StartPage';
import LoginPage from '../pages/auth/LoginPage';
import Profile from '../pages/user/Profile';
import ListTasks from '../pages/task/ListTasks';
import KanbanBoardsPage from '../pages/task/KanbanBoardsPage';

import { authPath } from './ApiPath';

import { getUserPath, getProjectsPath } from './ApiPath';

const AppRouter = () => {
	const [user, setUser] = useState({});
	const [projects, setProjects] = useState([]);

	const getUser = async () => {
		try {
			const response = await axios.get(getUserPath, { withCredentials: true });
			setUser(response.data);
			return response.data; // Возвращаем данные пользователя
		} catch (error) {
			console.error('Error fetching user:', error);
			window.location.href = authPath;
		}
	};

	const getProjects = async username => {
		try {
			const response = await axios.get(getProjectsPath(username), { withCredentials: true });
			setProjects(response.data);
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	// Запускаем getUser(), получаем данные, затем передаем в getProjects()
	const fetchData = async () => {
		const userData = await getUser(); // Дождаться завершения запроса пользователя
		if (userData?.name) {
			await getProjects(userData.name); // Передаём имя из `userData`
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const testUser = { name: 'Халимендик Николай' };
	const testProjects = [
		{ name: 'Тестовый проект 1' },
		{ name: 'Тестовый проект 2' },
		{ name: 'Тестовый проект 3' },
		{ name: 'Тестовый проект 4' },
		{ name: 'Тестовый проект 5' },
		{ name: 'Тестовый проект 6' },
		{ name: 'Тестовый проект 7' },
		{ name: 'Тестовый проект 8' },
		{ name: 'Тестовый проект 9' },
		{ name: 'Тестовый проект 10' },
		{ name: 'Тестовый проект 11' },
		{ name: 'Тестовый проект 12' },
		{ name: 'Тестовый проект 13' },
		{ name: 'Тестовый проект 14' },
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
