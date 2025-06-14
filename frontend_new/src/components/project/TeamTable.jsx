import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import RolesInProject from './RolesInProject';

import { MDBIcon, MDBBtn, MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

export default function TeamTable({ team }) {
	const { api, project, projectIdClicked, usernameAndName } = useContext(AppContext);
	const { setProjectTrigger } = useContext(AuthContext);

	return (
		<MDBTable align='middle' style={{ color: 'black', margin: '0' }}>
			<MDBTableBody>
				{project.team.map(member => (
					<tr key={member.username} style={{ fontSize: '1rem' }}>
						<td>
							<div className='d-flex align-items-center'>
								<MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='2x' fas icon='user-circle' />
								<div className='ms-3'>
									<p className='mb-0' style={{ fontWeight: '400' }}>
										{usernameAndName[member.username]}
									</p>
								</div>
							</div>
						</td>
						<td>
							<RolesInProject rolesValue={member.roles} />
						</td>
						<td>
							<MDBBtn color='white' onClick={() => null}>
								<MDBIcon fas color='success' size='lg' icon='save' />
							</MDBBtn>
							<MDBBtn color='white' style={{ marginLeft: '1rem' }} onClick={() => api.kickedOut(projectIdClicked, member.username, setProjectTrigger)}>
								<MDBIcon fas color='danger' size='lg' icon='sign-out-alt' />
							</MDBBtn>
						</td>
					</tr>
				))}
			</MDBTableBody>
		</MDBTable>
	);
}
