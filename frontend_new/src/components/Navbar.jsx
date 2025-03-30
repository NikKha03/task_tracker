import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBNavbarLink } from 'mdb-react-ui-kit';

export default function Navbar({ pageType, user }) {
	const navigate = useNavigate();

	const names = [
		{ name: 'Нужно сделать', icon: <MDBIcon far size='lg' icon='folder' /> },
		{ name: 'В работе', icon: <MDBIcon far size='lg' icon='folder' /> },
		{ name: 'Просроченные', icon: <MDBIcon far size='lg' icon='folder' /> },
		{ name: 'Завершенные', icon: <MDBIcon far size='lg' icon='folder' /> },
	];

	const [idClicked, setIdClicked] = useState(0);

	const taskStatus = (id, icon, name) => {
		return (
			<div className={`task-status ${idClicked === id ? 'active' : ''}`} key={id} onClick={() => setIdClicked(id)}>
				<div style={{ display: 'flex' }}>
					<div className='icon'>{icon}</div>
					<h2>{name}</h2>
				</div>
			</div>
		);
	};
	const projBlokForList = () => {
		return (
			<>
				<div className='top'>{/* <h4>t</h4> */}</div>
				<div className='bottom' style={{ padding: '0' }}>
					{names.map((obj, i) => taskStatus(i, obj.icon, obj.name))}
				</div>
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
