import { MDBInput } from 'mdb-react-ui-kit';

export default function Tags({ tags, setTags }) {
	const handleKeyPress = event => {
		if (event.key === 'ArrowDown') {
			const input = document.getElementById('tag');
			const newTag = input.value.trim();

			if (newTag) {
				setTags(prevTags => [...prevTags, newTag]);
				input.value = '';
			}
		}
	};

	return (
		<>
			<div>
				<h2 style={{ fontSize: '1.25rem' }}>Тэги</h2>
				<MDBInput
					onKeyDown={handleKeyPress}
					style={{ height: '2.25rem', backgroundColor: '#ffffff', marginBottom: '0.25rem' }}
					id='tag'
					type='text'
					autoComplete='off'
					placeholder='Тэг. Нажмите на стрелку вниз для добавления'
				/>
				<div style={{ overflowY: 'auto', width: '100%', maxHeight: '6rem' }}>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{tags.map((tag, i) => (
							<div style={{ paddingRight: '0.5rem' }} key={i}>
								#{tag}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
