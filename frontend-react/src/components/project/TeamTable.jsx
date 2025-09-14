import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { MDBIcon, MDBBtn, MDBTable, MDBTableBody } from 'mdb-react-ui-kit';

export default function TeamTable() {
	const { api, project, projectIdClicked, usernameAndName } = useContext(AppContext);
	const { setProjectTrigger } = useContext(AuthContext);

	return (
		<MDBTable align='middle' style={{ color: 'black', margin: '0' }}>
			<MDBTableBody>
				{project.team.map(member => (
					<tr key={member.username} style={{ fontSize: '1rem', display: 'flex' }}>
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
						<td style={{ marginLeft: 'auto' }}>
							<MDBBtn
								style={{ backgroundColor: '#e04c63', boxShadow: 'none', borderRadius: '4px' }}
								onClick={() => api.kickedOut(projectIdClicked, member.username, setProjectTrigger)}
							>
								<MDBIcon fas color='white' size='lg' icon='sign-out-alt' />
							</MDBBtn>
						</td>
					</tr>
				))}
			</MDBTableBody>
		</MDBTable>
	);
}
