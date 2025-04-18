import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import { authPath } from '../../resources/ApiPath';

const LoginPage = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) return null; // Пока данные загружаются — ничего не рендерим

	return user ? children : (window.location.href = authPath);
};

export default LoginPage;
