import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { authPath, getUserPath, getProjectsPath } from '../resources/ApiPath';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true); // Для контроля загрузки
	const [trigger, setTrigger] = useState(false);

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
			console.error('Error fetching projects:', error);
		}
	};

	const fetchData = async () => {
		const userData = await getUser(); // Дождаться завершения запроса пользователя
		if (userData?.name) {
			await getProjects(userData.name); // Передаём имя из `userData`
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setTrigger(false);
		fetchData();
	}, [trigger]);

	// Функция для выхода
	const logout = async () => {
		await axios.post('/api/logout', {}, { withCredentials: true });
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, projects, loading, logout, setTrigger }}>{children}</AuthContext.Provider>;
};
