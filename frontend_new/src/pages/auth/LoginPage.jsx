import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { authPath } from '../../resources/ApiPath';

const LoginPage = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <h1>Loading...</h1>; // Пока данные загружаются — ничего не рендерим

	return user ? children : (window.location.href = authPath);
};

export default LoginPage;
