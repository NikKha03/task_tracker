import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import AppRouter from './AppRouter';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	return (
		<AuthProvider>
			<AppProvider>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</AppProvider>
		</AuthProvider>
	);
}

export default App;
