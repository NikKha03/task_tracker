import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import StartPage from './pages/user/StartPage';
import LoginPage from './pages/auth/LoginPage';
import Profile from './pages/user/Profile';
import ListTasks from './pages/task/ListTasks';
import KanbanBoardsPage from './pages/task/KanbanBoardsPage';

const AppRouter = () => {
  const testUser = { name: 'Халимендик Николай' };
  const testProjects = [
    { name: 'Тестовый проект 1' },
    { name: 'Тестовый проект 2' },
    { name: 'Тестовый проект 3' },
    { name: 'Тестовый проект 4' },
    { name: 'Тестовый проект 5' },
    { name: 'Тестовый проект 6' },
    { name: 'Тестовый проект 7' },
    { name: 'Тестовый проект 8' },
    { name: 'Тестовый проект 9' },
    { name: 'Тестовый проект 10' },
    { name: 'Тестовый проект 11' },
    { name: 'Тестовый проект 12' },
    { name: 'Тестовый проект 13' },
    { name: 'Тестовый проект 14' },
  ];

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route
        path="/list"
        element={
          <LoginPage>
            <ListTasks />
          </LoginPage>
        }
      />
      <Route
        path="/board"
        element={
          <LoginPage>
            <KanbanBoardsPage />
          </LoginPage>
        }
      />
      <Route
        path="/profile"
        element={
          <LoginPage>
            <Profile />
          </LoginPage>
        }
      />
    </Routes>
  );
};

export default AppRouter;
