import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBNavbarLink } from 'mdb-react-ui-kit';

export default function Navbar({ pageType, user, project }) {
	const navigate = useNavigate();

	const projBlokForList = () => {
		return (
			<>
				<div></div>
				<div className=''>{/* <h4>List</h4> */}</div>
			</>
		);
	};
	const projBlokForBoard = () => {
		return <h1>Board</h1>;
	};

	const manageProjBlok = () => {
		switch (pageType) {
			case 'list':
				return projBlokForList();
			case 'board':
				return projBlokForBoard();
		}
	};

	return (
		<MDBNavbar className='navbar'>
			<div className='profile-block' onClick={() => navigate('/profile/')}>
				<MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='2x' fas icon='user-circle' />
				<h2 style={{ cursor: 'pointer' }}>{user.name}</h2>
			</div>
			<div className='nav-m'>{manageProjBlok()}</div>
		</MDBNavbar>
	);
}
