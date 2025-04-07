import React, { useState } from 'react';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBNavbarLink } from 'mdb-react-ui-kit';

/*
	НЕОБХОДИМО УЧИТЫВАТЬ, ЧТО ЕСЛИ ПОЛЬЗОВАТЕЛЬ ОДИН В ПРОЕКТЕ, 
	ТО ОН ПОЛУЧАЕТ ЗАДАЧИ ПО HTTP ЗАПРОСУ, ИНАЧЕ НЕОБХОДИМО ПОДКЛЮЧИТЬ К WEBSOCKET 
*/

export default function Task({ task }) {
	const iconColor = {
		color: '#797979',
	};
	if (task.taskStatus === 'COMPLETED') iconColor.color = '#22ac55';
	return (
		<>
			<div className='task'>
				<MDBIcon className='doneIcon' fas icon='check-circle' size='2x' style={iconColor} />
				<div className='main'>
					<div className='top'>
						<h3>{task.header}</h3>
					</div>
					{/* <div className='bot'>описание</div> */}
				</div>
				<div className='right'>
					<div className='top'>
						<MDBIcon fas icon='ellipsis-v' style={{ height: '1rem', width: '1rem', textAlign: 'center' }} />
					</div>
					<div className='bot'>
						<MDBIcon className='user-icon' style={{ cursor: 'pointer' }} size='lg' fas icon='user-circle' />
					</div>
				</div>
			</div>
		</>
	);
}
