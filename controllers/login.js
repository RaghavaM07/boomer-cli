const { prompt } = require('inquirer');

const axios = require('../axiosInstance');
const writeConfig = require('../writeConfig');
const errorHandler = require('../errorHandler');

const questions = [
	{
		type: 'input',
		name: 'username',
		message: 'Username: '
	},
	{
		type: 'password',
		mask: '*',
		name: 'password',
		message: 'Password: '
	}
];

module.exports = async (config, params) => {
	if (config.authToken) {
		console.log('You are already logged in.');
		console.log('Logging in again will remove the previous login.');
	}

	const { username, password } = await prompt(questions);

	try {
		const resp = await axios.post('/auth/login', { username, password });

		const { token } = resp.data;
		writeConfig('authToken', token);

		console.log('Login succesful!');
	} catch (err) {
		const errorMap = {
			'USERNAME_INVALID': `We couldn't find \`${username}\`! Plz recheck the username.`,
			'PASSWORD_INVALID': 'Incorrect password!'
		};

		errorHandler(err, errorMap);
		return;
	}
}
