import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TaskStatus({ status, setStatus }) {
	const handleChange = event => {
		setStatus(event.target.value);
	};

	return (
		<Select style={{ width: '100%', height: '2.25rem', backgroundColor: '#ffffff', color: '#4f4f4f' }} value={status} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }} size='small' displayEmpty>
			<MenuItem value='AWAITING_COMPLETION'>Нужно сделать</MenuItem>
			<MenuItem value='IN_PROGRESS'>В работе</MenuItem>
			<MenuItem value='COMPLETED'>Готово</MenuItem>
		</Select>
	);
}
