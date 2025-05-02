import React, { useContext } from 'react';
import axios from 'axios';

import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

import { AuthContext } from '../../context/AuthContext';
import { createProjectPath } from '../../resources/ApiPath';

export default function CreateProject({ isOpen, toggle }) {
	const { user, setProjectTrigger } = useContext(AuthContext);

	const createProject = async projectName => {
		if (projectName.trim().length < 1) return null;
		try {
			await axios.post(
				createProjectPath,
				{
					name: projectName.trim(),
					projectType: 'INDIVIDUAL_USER',
					principalUser: user.name,
				},
				{ withCredentials: true }
			);
			setProjectTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleSubmitSave = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		createProject(data.get('projectName'));
		toggle();
	};

	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<form onSubmit={handleSubmitSave}>
					<MDBModalDialog size='lg'>
						<MDBModalContent className='modal-content'>
							<MDBModalHeader>
								<MDBModalTitle>Создать проект</MDBModalTitle>
								<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
							</MDBModalHeader>

							<MDBModalBody>
								<p style={{ marginBottom: '0.25rem' }}>Название проекта</p>
								<MDBInput name='projectName' autoComplete='off' />
							</MDBModalBody>

							<MDBModalFooter>
								<MDBBtn type='submitSave' className='cust-btn' color='success'>
									Создать
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</form>
			</MDBModal>
		</>
	);
}
