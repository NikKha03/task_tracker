import React, { useState } from 'react';

import Task from './Task';

export default function Column({ status }) {
	const column = (style, header, paddingBottom) => {
		return (
			<>
				<div className='column-background' style={style}>
					<div className='column-area'>
						<h2 style={{ paddingBottom: paddingBottom }}>{header}</h2>
						{header === 'Нужно сделать' ? <p>+ Добавить задачу</p> : null}

						<div className='tasks'>
							<Task />
						</div>
					</div>
				</div>
			</>
		);
	};

	switch (status) {
		case 'AWAITING_COMPLETION':
			return column({ backgroundColor: '#999999' }, 'Нужно сделать', '0.25rem');
		case 'IN_PROGRESS':
			return column({ backgroundColor: '#ff7324' }, 'В работе', '0.75rem');
		case 'COMPLETED':
			return column({ backgroundColor: '#71db7f' }, 'Готово', '0.75rem');
	}
}
