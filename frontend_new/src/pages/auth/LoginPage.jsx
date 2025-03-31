import React, { useEffect } from 'react';
import axios from 'axios';

import { authPath } from '../../resources/ApiPath';

const LoginPage = () => {
	return (window.location.href = authPath);
};

export default LoginPage;
