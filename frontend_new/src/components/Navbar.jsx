import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBNavbarLink } from 'mdb-react-ui-kit';

export default function Navbar({ user, project }) {
	const navigate = useNavigate();

	return (
		<MDBNavbar className='navbar'>
			<div className='profile-block' onClick={() => navigate('/profile/')}>
				<MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='2x' fas icon='user-circle' />
				<h2 style={{ cursor: 'pointer' }}>{user.name}</h2>
			</div>
			<div className='project-block'></div>
		</MDBNavbar>
	);
}
