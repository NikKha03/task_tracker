import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';
import SelectFromMembers from '../../task/SelectFromMembers';
import TaskStatus from '../../task/TaskStatus';
import { Creator } from '../../task/Creator';
import '../../../styles/TaskPanel.css';
import { MDBBtn, MDBIcon, MDBModal, MDBTextArea } from 'mdb-react-ui-kit';
import api from '../../../api/ApiHandlers';

export default function ChangeTask({ task, topRightModal, setTopRightModal }) {
    const { setTaskTrigger } = useContext(AppContext);
    const [implementer, setImplementer] = useState(null);
    const [status, setStatus] = useState('AWAITING_COMPLETION');
    const [urls, setUrls] = useState([]);
    const [tags, setTags] = useState([]);

    const changeTask = (taskId, header, comment, deadline, taskStatus, implementer, makeUrlsObj, makeTagsObj) => {
        api.changeTask(taskId, {
            header: header,
            comment: comment,
            deadline: deadline.length < 10 ? null : deadline,
            taskStatus: taskStatus,
            implementer: implementer === '' ? null : implementer,
            urlsObj: makeUrlsObj,
            tags: makeTagsObj,
        }).then((isChanged) => {
            if (isChanged) {
                setTaskTrigger(true);
                setTopRightModal(false);
            }
        });
    };

    const deleteTask = (taskId) => {
        api.deleteTask(taskId).then((isDeleted) => {
            if (isDeleted) {
                setTaskTrigger(true);
                setTopRightModal(false);
            }
        });
    };

    const handleSubmitSave = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let startValue = '';
        urls.forEach((url) => (startValue += `${startValue.length < 1 ? '' : ', '}"${url}"`));
        const makeUrlsObj = '{ "urls": [' + startValue + '] }';

        let startValueTag = '';
        tags.forEach((tag) => (startValueTag += `${startValueTag.length < 1 ? '' : ', '}"${tag}"`));
        const makeTagsObj = '{ "tags": [' + startValueTag + '] }';

        changeTask(task.taskId, data.get('header'), data.get('comment'), data.get('deadline') + ' 00:00', status, implementer, makeUrlsObj, makeTagsObj);
    };

    useEffect(() => {
        if (task !== null) {
            setImplementer(task.implementer !== null ? task.implementer : '');
            setStatus(task.taskStatus);

            if (task.urlsObj !== null) {
                const fixedUrlsObj = JSON.parse(task.urlsObj);
                setUrls(fixedUrlsObj.urls);
            } else {
                setUrls([]);
            }

            if (task.tags !== null) {
                const fixedTagsObj = JSON.parse(task.tags);
                setTags(fixedTagsObj.tags);
            } else {
                setTags([]);
            }
        }
    }, [task]);

    return (
        <>
            {task === null ? null : (
                <MDBModal  staticBackdrop animationDirection="right" open={topRightModal} onClose={() => setTopRightModal(false)}>
                    <div className="task-panel">
                        <div className="header">
                            <h2>Редактировать задачу</h2>
                            <MDBBtn className="btn-close btn-close-white" color="none" onClick={() => setTopRightModal(false)}></MDBBtn>
                        </div>

                        <form className='task-form' style={{ height: '100%', position: 'relative' }} onSubmit={handleSubmitSave}>
                            <div className="content">
                                <div className="field">
                                    <label>Заголовок</label>
                                    <input style={{ height: '2.25rem' }} name="header" type="text" autoComplete="off" defaultValue={task.header} />
                                </div>
                                <div className="field">
                                    <label>Описание</label>
                                    <textarea className="selector" style={{ height: '10rem' }} name="comment" defaultValue={task.comment} />
                                </div>
                                <div className="field">
                                    <label>Дедлайн</label>
                                    <input
                                        id="date"
                                        name="deadline"
                                        type="date"
                                        autoComplete="off"
                                        defaultValue={task.deadline === null ? '' : task.deadline.substring(0, 10)}
                                        className="selector"
                                        style={{ width: '100%', height: '2.25rem' }}
                                    />
                                </div>
                                <div className="field">
                                    <label>Исполнитель</label>
                                    <SelectFromMembers member={implementer} setMember={setImplementer} />
                                </div>
                                <Creator username={task.creator} />

                                <div className="field">
                                    <label>Статус</label>
                                    <TaskStatus status={status} setStatus={setStatus} />
                                </div>
                            </div>

                            <div className="footer">
                                <MDBBtn type="submitSave" color="success" style={{ width: 'calc(100% - 4.5rem)', boxShadow: 'none', borderRadius: '4px' }}>
                                    Сохранить
                                </MDBBtn>
                                <MDBBtn
                                    type="submitDelete"
                                    style={{ width: '4rem', marginLeft: '0.5rem', boxShadow: 'none', borderRadius: '4px' }}
                                    color="danger"
                                    onClick={() => deleteTask(task.taskId)}
                                >
                                    <MDBIcon far icon="trash-alt" />
                                </MDBBtn>
                            </div>
                        </form>
                    </div>
                </MDBModal>
            )}
        </>
    );
}
