import { MDBInput } from 'mdb-react-ui-kit';

export default function Vedlegg({ urls, setUrls }) {
	const handleKeyPress = event => {
		if (event.key === 'ArrowDown') {
			const input = document.getElementById('filesUrl');
			const newUrl = input.value.trim();

			if (newUrl) {
				setUrls(prevUrls => [...prevUrls, newUrl]);
				input.value = '';
			}
		}
	};

	return (
		<>
			<div>
				<h2 style={{ fontSize: '1.25rem' }}>Вложения</h2>
				<MDBInput
					onKeyDown={handleKeyPress}
					style={{ height: '2.25rem', backgroundColor: '#ffffff', marginBottom: '0.25rem' }}
					id='filesUrl'
					type='text'
					autoComplete='off'
					placeholder='Ссылка. Нажмите на стрелку вниз для добавления'
				/>
				<div style={{ overflowY: 'auto', maxHeight: '6rem' }}>
					<ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
						{urls.map((url, i) => (
							<li key={i}>
								<a target='_blank' href={url}>
									{url}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
