import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './resources/AppRouter';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
