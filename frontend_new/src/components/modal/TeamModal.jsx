import React, { useState, useContext } from 'react';
import axios from 'axios';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { inviteInProjectPath } from '../../resources/ApiPath';
import TeamTable from '../TeamTable';

import { MDBBtn, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

const teamList = usernameAndName => {
	const elements = [];
	if (Object.keys(usernameAndName).length > 0) {
		for (var key in usernameAndName) {
			elements.push(<div key={key}>{usernameAndName[key]}</div>);
		}
	}
	return elements;
};

export default function TeamModal({ isOpen, toggle }) {
	const { project, projectIdClicked, usernameAndName } = useContext(AppContext);
	const { setProjectTrigger } = useContext(AuthContext);

	console.log(project.team);
	console.log(usernameAndName);

	const inviteInProject = async (projectIdClicked, username) => {
		try {
			await axios.post(inviteInProjectPath(username, projectIdClicked), { withCredentials: true });
			setProjectTrigger(true);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleIncite = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		inviteInProject(projectIdClicked, data.get('usernameInvite'));
	};

	return (
		<>
			<MDBModal open={isOpen} onClose={toggle} tabIndex='-1'>
				<MDBModalDialog size='lg'>
					<MDBModalContent className='modal-content'>
						<MDBModalHeader>
							<MDBModalTitle>Управление доступом</MDBModalTitle>
							<MDBBtn className='btn-close' color='none' onClick={toggle}></MDBBtn>
						</MDBModalHeader>

						<MDBModalBody style={{ padding: '1rem 1.4em' }}>
							<p style={{ marginBottom: '0.25rem' }}>Username пользователя</p>
							<form onSubmit={handleIncite}>
								<div style={{ display: 'flex' }}>
									<MDBInput name='usernameInvite' autoComplete='off' />

									{/* <RolesInProject /> */}
									<MDBBtn color='success' style={{ width: '4rem', marginLeft: '0.5rem', boxShadow: 'none', borderRadius: '4px' }}>
										<MDBIcon fas icon='share-square' />
									</MDBBtn>
								</div>
							</form>
						</MDBModalBody>

						<MDBModalFooter style={{ justifyContent: 'start', padding: '0' }} id='team-list'>
							{/* {teamList(usernameAndName).map(element => element)} */}
							<TeamTable team={teamList} />
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
