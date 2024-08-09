import React, { useEffect, useState } from 'react';
import Checkout from '../../components/user/Checkout';
import Navbar from '../../components/user/Navbar';

const UserPage = () => {
	return (
		<>
			<Navbar />
			<Checkout />
		</>
	);
};

export default UserPage;
