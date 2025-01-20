import React, { useEffect } from 'react';
import axios from 'axios';

import { checkAuthPath } from '../../ApiPath';

const checkAuth = async () => {
	const response = await axios
		.get(checkAuthPath, {
			withCredentials: true,
		})
		.then(response => {
			response.data === true ? null : (location.href = 'http://localhost:9010/login');
		});
};

export default function Root() {
	useEffect(() => {
		checkAuth();
	}, []);
}
