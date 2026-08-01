import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/ApiHandlers';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true); // Для контроля загрузки
    const [projectTrigger, setProjectTrigger] = useState(false);

    const getProjects = (username) => {
        api.getProjects(username).then((projects) => {
            if (projects) setProjects(projects);
        });
    };

    useEffect(() => {
        api.getUser().then((user) => {
            if (user && user?.name) {
                setUser(user);
                getProjects(user.name);
                setLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        setProjectTrigger(false);
        getProjects(user?.name);
    }, [projectTrigger]);

    // TODO: Функция для выхода
    const logout = async () => {
        await axios.post('/api/logout', {}, { withCredentials: true });
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, projects, loading, logout, projectTrigger, setProjectTrigger }}>{children}</AuthContext.Provider>;
};
