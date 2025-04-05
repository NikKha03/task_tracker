import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from './AuthContext';
import { authPath, getUserPath, getProjectPath } from '../resources/ApiPath';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const { user, logout } = useContext(AuthContext);

	const getProject = async (id, username) => {
		try {
			const response = await axios.get(getProjectPath(id, username), { withCredentials: true });
			if (response.data.body !== null) {
				setProject(response.data.body);
			} else {
				setProject({});
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	};

	let params = new URLSearchParams(document.location.search);
	const [projectIdClicked, setProjectIdClicked] = useState(parseInt(params.get('project')));
	const [project, setProject] = useState({});

	useEffect(() => {
		if (!user) return;
		if (isNaN(projectIdClicked)) return;

		getProject(projectIdClicked, user.name);
	}, [projectIdClicked, user]);

	return <AppContext.Provider value={{ projectIdClicked, setProjectIdClicked, project }}>{children}</AppContext.Provider>;
};
