import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from './AuthContext';
import { getProjectPath, getUsersByUsernamePath } from '../resources/ApiPath';

export const AppContext = createContext(null);

const getUsersByUsername = async (usernames, setUsernameAndName) => {
	try {
		const response = await axios.post(getUsersByUsernamePath, usernames, { withCredentials: true });
		setUsernameAndName(response.data);
	} catch (error) {
		console.error('Error fetching projects:', error);
	}
};

export const AppProvider = ({ children }) => {
	const { user, projectTrigger } = useContext(AuthContext);
	const [taskTrigger, setTaskTrigger] = useState(false);

	const getProject = async (id, username) => {
		try {
			const response = await axios.get(getProjectPath(id, username), { withCredentials: true });
			if (response.data.body !== null) {
				setProject(response.data.body);
				setTabs(response.data.body.tabs);
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

	const [tabIdClicked, setTabIdClicked] = useState(parseInt(params.get('tab')));
	let [tabs, setTabs] = useState([]);

	if (tabs.length > 0) {
		tabs = tabs.sort(function (a, b) {
			return a.tabId - b.tabId;
		});
	}

	const [usernameAndName, setUsernameAndName] = useState({});
	const usernames = [];

	useEffect(() => {
		if (!user) return;
		if (isNaN(projectIdClicked)) return;
		getProject(projectIdClicked, user.name);
	}, [projectIdClicked, projectTrigger, user]);

	useEffect(() => {
		if (project.team !== undefined) project.team.forEach(i => usernames.push(i.username));
		if (usernames.length > 0) getUsersByUsername(usernames, setUsernameAndName);
	}, [project]);

	return <AppContext.Provider value={{ taskTrigger, setTaskTrigger, projectIdClicked, setProjectIdClicked, project, tabIdClicked, setTabIdClicked, tabs, usernameAndName }}>{children}</AppContext.Provider>;
};
