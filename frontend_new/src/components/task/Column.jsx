import React, { useState } from 'react';

export default function Column({ status }) {
	const column = (style, header) => {
		return (
			<>
				<div className='column-background' style={style}>
					<div className='column-area'>
						<h2>{header}</h2>
						{header === 'Нужно сделать' ? <p>+ Добавить задачу</p> : null}
					</div>
				</div>
			</>
		);
	};

	switch (status) {
		case 'AWAITING_COMPLETION':
			return column({ backgroundColor: '#999999' }, 'Нужно сделать');
		case 'IN_PROGRESS':
			return column({ backgroundColor: '#ff7324' }, 'В работе');
		case 'COMPLETED':
			return column({ backgroundColor: '#71db7f' }, 'Готово');
	}
}
