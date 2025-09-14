import GroupByDate from './GroupByDate';
import { dateParser } from '../../utils/DateUtils';
import { MDBIcon } from 'mdb-react-ui-kit';

/*
	НЕОБХОДИМО УЧИТЫВАТЬ, ЧТО ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОДИН В ПРОЕКТЕ, 
	ТО ОН ПОЛУЧАЕТ ЗАДАЧИ ПО HTTP ЗАПРОСУ, ИНАЧЕ НЕОБХОДИМО ПОДКЛЮЧИТЬ К WEBSOCKET 
*/

export default function Task({ task, tasks = [], setChangeTask, toggleOpen, displayMethod }) {
	const iconColor = {
		color: '#797979',
	};
	if (task.taskStatus === 'COMPLETED') iconColor.color = '#22ac55';

	const click = () => {
		setChangeTask(task);
		toggleOpen();
	};

	let borderColor = '#F5F5F5';
	if (displayMethod === 'list' && task.taskStatus === 'COMPLETED') {
		if (task.deadline !== null) {
			const datePlannedImplementation = Date.parse(task.deadline.substring(0, 10));
			const dateExecution = Date.parse(task.executionDate.substring(0, 10));
			const currenDate = dateParser(new Date());

			datePlannedImplementation === dateExecution || currenDate < datePlannedImplementation ? (borderColor = '#C8E6C9') : (borderColor = '#FFE0B2');
		}
		if (task.deadline === null) {
			borderColor = '#C8E6C9';
		}
	} else if (displayMethod === 'list') {
		if (task.deadline !== null) {
			const datePlannedImplementation = Date.parse(task.deadline.substring(0, 10));
			const currenDate = dateParser(new Date());

			datePlannedImplementation < currenDate ? (borderColor = '#FFCDD2') : null;
		}
	}

	const listStyle = () => {
		return displayMethod === 'list' ? { backgroundColor: borderColor } : {};
	};

	return (
		<>
			{displayMethod === 'list' && <GroupByDate tasks={tasks} task={task} />}
			<div className='task' style={listStyle()}>
				<MDBIcon className='doneIcon' fas icon='check-circle' size='2x' style={iconColor} />
				<div className='main'>
					<div className='top'>
						<h3>{task.header}</h3>
					</div>
				</div>
				<div className='right'>
					<div className='top'>
						<MDBIcon fas icon='ellipsis-v' style={{ cursor: 'pointer', height: '1rem', width: '1rem', textAlign: 'center' }} onClick={() => click()} />
					</div>
					<div className='bot'>{task.implementer !== null && <MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='lg' fas icon='user-circle' />}</div>
				</div>
			</div>
		</>
	);
}
