import React from 'react';
import axios from 'axios';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBNavbarLink } from 'mdb-react-ui-kit';

export default function Navbar({ user, project }) {
	return (
		<MDBNavbar className='navbar'>
			<div className='profile-block'>
				<MDBIcon className='user-icon' size='2x' fas icon='user-circle' />
				<h2>{user.name}</h2>
			</div>
			<div className='project-block'></div>
		</MDBNavbar>
	);
}
