// из 01.01.2000 в 2000-01-01
export const dateParser = currentDate => {
	const [day, month, year] = currentDate.toLocaleDateString().split('.');
	return Date.parse(`${year}-${month}-${day}`);
};

export const dateCreate = (date, time) => {
	if (date.length > 0) {
		const [day, month, year] = date.trim().split('.');
		if (time === '') time = '00:00';
		return `${year}-${month}-${day} ${time.trim()}`;
	}

	return undefined;
};

export const dateChange = fullDate => {
	if (fullDate.length > 0) {
		let [date, time] = fullDate.split(' ');
		const [day, month, year] = date.trim().split('.');
		if (time === undefined) time = '00:00';
		return `${year}-${month}-${day} ${time.trim()}`;
	}

	return undefined;
};

export const showDate = fullDate => {
	if (fullDate === '' || fullDate === null) {
		return '';
	}
	let [date, time] = fullDate.trim().split(' ');
	const [year, month, day] = date.split('-');

	return time === '00:00' ? `${day}.${month}.${year}` : `${day}.${month}.${year} ${time}`;
};
