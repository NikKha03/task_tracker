import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import AppRouter from './AppRouter';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
