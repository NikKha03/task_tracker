import React, { useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import RolesInProject from './RolesInProject';

import { MDBIcon, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function TeamTable({ team }) {
	const { project, usernameAndName } = useContext(AppContext);

	return (
		<MDBTable align='middle' style={{ color: 'black', margin: '0' }}>
			{/* <MDBTableHead>
				<tr>
					<th scope='col'>Имя</th>
					<th scope='col'>Роли</th>
					<th scope='col'>Действия</th>
				</tr>
			</MDBTableHead> */}
			<MDBTableBody>
				{project.team.map(member => (
					<tr key={member.username} style={{ fontSize: '1rem' }}>
						<td>
							<div className='d-flex align-items-center'>
								{/* <img src='https://mdbootstrap.com/img/new/avatars/8.jpg' alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' /> */}
								<MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='2x' fas icon='user-circle' />
								<div className='ms-3'>
									<p className='mb-0' style={{ fontWeight: '400' }}>
										{usernameAndName[member.username]}
									</p>
									{/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
								</div>
							</div>
						</td>
						<td>
							<RolesInProject rolesValue={member.roles} />
						</td>
						<td>
							<MDBIcon fas color='success' size='lg' icon='save' />
							<MDBIcon fas color='danger' size='lg' icon='sign-out-alt' />
						</td>
					</tr>
				))}
			</MDBTableBody>
		</MDBTable>
	);
}
