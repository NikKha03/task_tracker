import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { AppContext } from '../../../context/AppContext';
import SelectFromMembers from '../../task/SelectFromMembers';
import TaskStatus from '../../task/TaskStatus';
import Vedlegg from '../../task/Vedlegg';
import Tags from '../../task/Tags';
import { Creator } from '../../task/Creator';
import { changeTaskPath, deleteTaskPath } from '../../../api/apiPath';

import '../../../styles/TaskPanel.css';
import { MDBBtn, MDBIcon, MDBModal, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';

export default function ChangeTask({ task, topRightModal, setTopRightModal }) {
	const { setTaskTrigger } = useContext(AppContext);
	const [implementer, setImplementer] = useState(null);
	const [status, setStatus] = useState('AWAITING_COMPLETION');
	const [urls, setUrls] = useState([]);
	const [tags, setTags] = useState([]);

	const changeTask = async (taskId, header, comment, deadline, taskStatus, implementer, makeUrlsObj, makeTagsObj) => {
		try {
			await axios.put(
				changeTaskPath(taskId),
				{
					header: header,
					comment: comment,
					deadline: deadline.length < 10 ? null : deadline,
					taskStatus: taskStatus,
					implementer: implementer === '' ? null : implementer,
					urlsObj: makeUrlsObj,
					tags: makeTagsObj,
				},
				{ withCredentials: true }
			);
			setTaskTrigger(true);
			setTopRightModal(false);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const deleteTask = async taskId => {
		try {
			await axios.delete(deleteTaskPath(taskId), { withCredentials: true });
			setTaskTrigger(true);
			setTopRightModal(false);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		let startValue = '';
		urls.forEach(url => (startValue += `${startValue.length < 1 ? '' : ', '}"${url}"`));
		const makeUrlsObj = '{ "urls": [' + startValue + '] }';

		let startValueTag = '';
		tags.forEach(tag => (startValueTag += `${startValueTag.length < 1 ? '' : ', '}"${tag}"`));
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
				<MDBModal animationDirection='right' open={topRightModal} onClose={() => setTopRightModal(false)}>
					<div className='create-task-panel'>
						<div className='header'>
							<h2 style={{ fontSize: '1.375rem', margin: '0' }}>Редактировать задачу</h2>
							<MDBBtn className='btn-close btn-close-white' color='none' onClick={() => setTopRightModal(false)}></MDBBtn>
						</div>

						<form style={{ height: '100%', position: 'relative' }} onSubmit={handleSubmitSave}>
							<div className='content'>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Заголовок</h2>
									<MDBInput style={{ height: '2.25rem', backgroundColor: '#ffffff' }} name='header' type='text' autoComplete='off' defaultValue={task.header} />
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Описание</h2>
									<MDBTextArea style={{ height: '5rem', backgroundColor: '#ffffff' }} name='comment' defaultValue={task.comment} />
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Дедлайн</h2>
									<MDBInput
										id='date'
										name='deadline'
										type='date'
										autoComplete='off'
										defaultValue={task.deadline === null ? '' : task.deadline.substring(0, 10)}
										style={{ width: '100%', height: '2.25rem', backgroundColor: '#ffffff' }}
										// size='small'
										// style={{ height: '2.25rem', backgroundColor: '#ffffff' }}
										// InputLabelProps={{
										// 	shrink: true,
										// }}
									/>
								</div>
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Исполнитель</h2>
									<SelectFromMembers member={implementer} setMember={setImplementer} />
								</div>
								<Creator username={task.creator} />
								<div>
									<h2 style={{ fontSize: '1.25rem' }}>Статус</h2>
									<TaskStatus status={status} setStatus={setStatus} />
								</div>
								<Vedlegg urls={urls} setUrls={setUrls} />
								<Tags tags={tags} setTags={setTags} />
							</div>

							<div className='footer'>
								<MDBBtn type='submitSave' color='success' style={{ width: 'calc(100% - 4.5rem)', boxShadow: 'none', borderRadius: '4px' }}>
									Сохранить
								</MDBBtn>
								<MDBBtn type='submitDelete' style={{ width: '4rem', marginLeft: '0.5rem', boxShadow: 'none', borderRadius: '4px' }} color='danger' onClick={() => deleteTask(task.taskId)}>
									<MDBIcon far icon='trash-alt' />
								</MDBBtn>
							</div>
						</form>
					</div>
				</MDBModal>
			)}
		</>
	);
}
