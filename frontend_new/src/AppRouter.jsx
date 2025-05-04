import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './pages/user/StartPage';
import LoginPage from './pages/auth/LoginPage';
import Profile from './pages/user/Profile';
import ListTasks from './pages/task/ListTasks';
import KanbanBoardsPage from './pages/task/KanbanBoardsPage';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/auth/login' element={<LoginPage />} />
				// нужна аутентификация
				<Route
					path='/list'
					element={
						<LoginPage>
							<ListTasks />
						</LoginPage>
					}
				/>
				<Route
					path='/board'
					element={
						<LoginPage>
							<KanbanBoardsPage />
						</LoginPage>
					}
				/>
				<Route
					path='/profile'
					element={
						<LoginPage>
							<Profile />
						</LoginPage>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
