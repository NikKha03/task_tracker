import React, { useEffect } from 'react';
import axios from 'axios';

import { checkAuthPath } from '../../ApiPath';

const checkAuth = async () => {
	const response = await axios
		.get(checkAuthPath, {
			withCredentials: true,
		})
		.then(response => {
			response.data === true ? null : (location.pathname = '/task-tracker/auth/login');
		});
};

export default function Root() {
	useEffect(() => {
		checkAuth();
	}, []);
}
