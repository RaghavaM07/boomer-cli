const { prompt } = require('inquirer');

const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

const questions = [
	{
		type: 'input',
		name: 'username',
		message: 'Enter a username: '
	},
	{
		type: 'password',
		mask: '*',
		name: 'password',
		message: 'Enter a password: '
	},
	{
		type: 'input',
		name: 'name',
		message: 'Enter your name: '
	}
];

module.exports = async (config, params) => {
	const answers = await prompt(questions);

	try {
		const resp = await axios.post('/auth/register', answers);

		const { username } = resp.data;
		console.log(`Your account is ready, ${username}! Plz login to get authenticated!`);
	} catch (err) {
		const errorMap = {
			'FIELDS_UNSPECIFIED': 'All fields are required!',
			'USERNAME_INUSE': 'Someone already has the same username! Maybe try another one?',
			'COULD_NOT_CREATE_USER': 'We couldn\'t create a user :( Plz try again!'
		};

		errorHandler(err, errorMap);
	}
}