import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { getUserPath, getProjectsPath } from '../api/apiPath';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	// console.log(user);
	const [projects, setProjects] = useState([]);

	const [loading, setLoading] = useState(true); // Для контроля загрузки
	const [projectTrigger, setProjectTrigger] = useState(false);

	// Функция для загрузки текущего пользователя
	const getUser = async () => {
		try {
			const response = await axios.get(getUserPath, { withCredentials: true });
			setUser(response.data);
			return response.data;
		} catch (error) {
			console.error('Ошибка при загрузке пользователя:', error);
			setUser(null);
		}
	};

	const getProjects = async username => {
		try {
			const response = await axios.get(getProjectsPath(username), { withCredentials: true });
			setProjects(response.data);
		} catch (error) {
			console.error('Ошибка при загрузке проекта:', error);
		}
	};

	useEffect(() => {
		getUser().then(user => {
			user?.name && getProjects(user.name);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		setProjectTrigger(false);
		getProjects(user?.name);
	}, [projectTrigger]);

	// TODO: Функция для выхода
	const logout = async () => {
		await axios.post('/api/logout', {}, { withCredentials: true });
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, projects, loading, logout, projectTrigger, setProjectTrigger }}>{children}</AuthContext.Provider>;
};
