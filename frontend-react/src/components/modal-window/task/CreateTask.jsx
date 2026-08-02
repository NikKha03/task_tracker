import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';
import SelectFromMembers from '../../task/SelectFromMembers';
import TaskStatus from '../../task/TaskStatus';
import '../../../styles/TaskPanel.css';
import { MDBBtn, MDBModal, MDBTextArea } from 'mdb-react-ui-kit';
import api from '../../../api/ApiHandlers';

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default function CreateTask({ toggleOpen, topRightModal, setTopRightModal }) {
    const { user } = useContext(AuthContext);
    const { setTaskTrigger, tabIdClicked } = useContext(AppContext);
    const [implementer, setImplementer] = useState('');
    const [status, setStatus] = useState('AWAITING_COMPLETION');
    const [urls, setUrls] = useState([]);
    const [tags, setTags] = useState([]);

    const createTask = (creatorUsername, header, comment, deadline, taskStatus, implementer, makeUrlsObj, makeTagsObj) => {
        api.createTask(creatorUsername, {
            tabId: tabIdClicked,
            header: header,
            comment: comment,
            deadline: deadline.length < 10 ? null : deadline,
            taskStatus: taskStatus,
            implementer: implementer === '' ? null : implementer,
            urlsObj: makeUrlsObj,
            tags: makeTagsObj,
        }).then((isCreated) => {
            if (isCreated) setTaskTrigger(true);
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

        createTask(user.name, data.get('header'), data.get('comment'), data.get('deadline') + ' 00:00', status, implementer, makeUrlsObj, makeTagsObj);
    };

    return (
        <>
            <MDBModal animationDirection="right" open={topRightModal} onClose={() => setTopRightModal(false)}>
                <div className="create-task-panel">
                    <div className="header">
                        <h2>Создать задачу</h2>
                        <MDBBtn className="btn-close btn-close-white" color="none" onClick={() => setTopRightModal(false)}></MDBBtn>
                    </div>

                    <form style={{ height: '100%', position: 'relative' }} onSubmit={handleSubmitSave}>
                        <div className="content">
                            <div className="field">
                                <label>Заголовок</label>
                                <input style={{ height: '2.25rem' }} name="header" type="text" autoComplete="off" />
                            </div>
                            <div className="field">
                                <label>Описание</label>
                                <textarea style={{ height: '10rem' }} name="comment" />
                            </div>
                            <div className="field">
                                <label>Дедлайн</label>
                                <input
                                    id="date"
                                    name="deadline"
                                    type="date"
                                    autoComplete="off"
                                    defaultValue={null}
                                    style={{ width: '100%', height: '2.25rem' }}
                                />
                            </div>
                            <div className="field">
                                <label>Исполнитель</label>
                                <SelectFromMembers member={implementer} setMember={setImplementer} />
                            </div>
                            <div className="field">
                                <label>Статус</label>
                                <TaskStatus status={status} setStatus={setStatus} />
                            </div>
                        </div>

                        <div className="footer">
                            <MDBBtn type="submitSave" color="success" style={{ width: '100%', boxShadow: 'none', borderRadius: '4px' }}>
                                Создать
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </MDBModal>
        </>
    );
}
