import React, { useState } from 'react';

import { MDBIcon, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';

export default function LeftMenu() {
	const header = name => {
		return (
			<div className='header'>
				<div className='icon'>
					<MDBIcon far size='lg' icon='folder' />
				</div>
				<h2>{name}</h2>
			</div>
		);
	};

	const projectsBlock = maxHeight => {
		return <div className='proj-block' style={{ maxHeight: maxHeight }}></div>;
	};

	return (
		<>
			<div className='left-menu'>
				<div className='top'>
					<div className='header' style={{ marginBottom: '0.75rem' }}>
						<div className='icon'>
							<MDBIcon far size='lg' icon='list-alt' />
						</div>
						<h2>Список моих задач</h2>
					</div>

					<div className='menu-item'>
						{header('Мои проекты')}
						{projectsBlock('14rem')}
						<MDBBtn className='add' color='success'>
							Создать проект
						</MDBBtn>
					</div>

					<div className='menu-item'>
						{header('Участвую в проектах')}
						{projectsBlock('14rem')}
					</div>

					<div className='menu-item' style={{ marginBottom: '0', paddingBottom: '0' }}>
						{header('Отслеживаю проекты')}
						{projectsBlock('9rem')}
					</div>
				</div>
				<div className='bottom'>
					<a href='#!'>
						<MDBIcon style={{ color: '#0d99ff' }} far icon='bell' size='lg' />
						<MDBBadge color='danger' notification pill>
							1
						</MDBBadge>
					</a>
				</div>
			</div>
		</>
	);
}
