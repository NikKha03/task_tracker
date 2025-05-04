import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AppProvider } from '../../context/AppContext';
import { authPath } from '../../resources/ApiPath';

const LoginPage = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <h3>Loading...</h3>; // Пока данные загружаются — ничего не рендерим

	return user ? (
		<AppProvider>{children}</AppProvider>
	) : (
		<>
			<h3>Loading...</h3>
			<script>{(window.location.href = authPath)}</script>
		</>
	);
};

export default LoginPage;
