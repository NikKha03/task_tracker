import { useState, useEffect } from 'react';

import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';

export default function RolesInProject({ rolesValue }) {
	// Создаем состояние для отслеживания выбранных ролей
	const [selectedRoles, setSelectedRoles] = useState({
		CREATOR: false,
		MEMBER: false,
		ADMIN: false,
		VIEWER: false,
	});

	// Функция для обновления состояния при изменении чекбокса
	const handleCheckboxChange = event => {
		const { name, checked } = event.target;
		setSelectedRoles({
			...selectedRoles,
			[name]: checked,
		});
	};

	// Получаем список выбранных ролей (можно использовать где-то еще в компоненте)
	const getActiveRoles = () => {
		return Object.keys(selectedRoles).filter(role => selectedRoles[role]);
	};

	useEffect(() => {
		const rolesName = [];
		if (rolesValue !== undefined) {
			rolesValue.forEach(role => rolesName.push(role.name));
		}
		const initialRoles = {
			CREATOR: rolesName.includes('CREATOR'),
			MEMBER: rolesName.includes('MEMBER'),
			ADMIN: rolesName.includes('ADMIN'),
			VIEWER: rolesName.includes('VIEWER'),
		};
		setSelectedRoles(initialRoles);
	}, []);

	return (
		<MDBDropdown style={{ marginLeft: '0.5rem' }}>
			<MDBDropdownToggle style={{ boxShadow: 'none', borderRadius: '4px' }}>Роли в проекте</MDBDropdownToggle>
			<MDBDropdownMenu>
				<div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', paddingBottom: '0' }}>
					<input
						type='checkbox'
						name='MEMBER'
						id='MEMBER'
						checked={selectedRoles.MEMBER}
						onChange={handleCheckboxChange}
						style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', borderRadius: '4px' }}
					/>
					<label htmlFor='MEMBER'>Участник</label>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', paddingBottom: '0' }}>
					<input
						type='checkbox'
						name='ADMIN'
						id='ADMIN'
						checked={selectedRoles.ADMIN}
						onChange={handleCheckboxChange}
						style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', borderRadius: '4px' }}
					/>
					<label htmlFor='ADMIN'>Администратор</label>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
					<input
						type='checkbox'
						name='VIEWER'
						id='VIEWER'
						checked={selectedRoles.VIEWER}
						onChange={handleCheckboxChange}
						style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', borderRadius: '4px' }}
					/>
					<label htmlFor='VIEWER'>Наблюдатель</label>
				</div>
			</MDBDropdownMenu>
		</MDBDropdown>
	);
}
