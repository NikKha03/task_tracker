import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';
import { MDBIcon } from 'mdb-react-ui-kit';
import CreateProject from '../modal-window/project/CreateProject';

export default function LeftMenu({ listIsClicked = false }) {
	const navigate = useNavigate();
	const { projects } = useContext(AuthContext);

	const header = name => {
		return (
			<div className='header'>
				<div className='icon'>
					<MDBIcon far size='lg' icon='folder' />
				</div>
				<h2>{name}</h2>
				{name === 'Мои проекты' ? <MDBIcon far icon='plus-square' style={{ marginLeft: 'auto', cursor: 'pointer' }} size='lg' color='success' onClick={toggleOpen} /> : null}
			</div>
		);
	};

	const { projectIdClicked, setProjectIdClicked, setTabIdClicked } = useContext(AppContext);
	const openProject = (projectId, id) => {
		setTabIdClicked(NaN);
		setProjectIdClicked(id);
		navigate(`/board?project=${projectId.projectId}`);
	};

	const projectsBlock = (maxHeight, projects = []) => {
		return (
			<div className='proj-block' style={{ maxHeight: maxHeight }}>
				{projects.map(project => (
					<a
						className={`a-proj ${projectIdClicked === project.projectId && !listIsClicked ? 'active' : ''}`}
						key={project.projectId}
						onClick={() => openProject(project, project.projectId)}
					>
						{project.name}
					</a>
				))}
			</div>
		);
	};

	const [basicModal, setBasicModal] = useState(false);
	const toggleOpen = () => setBasicModal(!basicModal);

	return (
		<>
			<div className='left-menu'>
				<div className='top'>
					<div className='menu-item'>
						<div
							className={`header h-btn ${listIsClicked ? 'active' : ''}`}
							onClick={() => {
								navigate('/list');
							}}
						>
							<div className='icon'>
								<MDBIcon far size='lg' icon='list-alt' />
							</div>
							<h2>Список моих задач</h2>
						</div>
					</div>

					<div className='menu-item'>
						{header('Мои проекты')}
						{projectsBlock('14rem', projects.myProjects)}
						<CreateProject isOpen={basicModal} toggle={toggleOpen} />
					</div>

					<div className='menu-item'>
						{header('Участвую в проектах')}
						{projectsBlock('14rem', projects.otherProjects)}
					</div>
				</div>
				<div className='bottom'></div>
			</div>
		</>
	);
}
