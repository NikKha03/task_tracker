import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/navigate/Navbar';
import LeftMenu from '../../components/navigate/LeftMenu';
import Column from '../../components/project/Column';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/ApiHandlers';

export default function KanbanBoardsPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { user } = useContext(AuthContext);
    const { taskTrigger, setTaskTrigger, tabIdClicked, projectIdClicked } = useContext(AppContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (taskTrigger) setTaskTrigger(false);
        if (!isNaN(tabIdClicked)) {
            api.getTasksByTabId(tabIdClicked, searchParams.get('project'), user.name).then((tasks) => {
                if (tasks) setTasks(tasks);
            });
        }
    }, [taskTrigger, tabIdClicked]);

    useEffect(() => {
        setTasks([]);
    }, [projectIdClicked]);

    return (
        <>
            <Navbar pageType={'board'} />
            <div className="task-area">
                <LeftMenu />
                <div className="main-window">
                    {!isNaN(tabIdClicked) && (
                        <>
                            <Column status={'AWAITING_COMPLETION'} tasks={tasks.AWAITING_COMPLETION} />
                            <Column status={'IN_PROGRESS'} tasks={tasks.IN_PROGRESS} />
                            <Column status={'COMPLETED'} tasks={tasks.COMPLETED} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
