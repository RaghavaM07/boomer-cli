const { prompt } = require('inquirer');

const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

questions = [
	{
		type: 'input',
		name: 'dest',
		message: 'Enter the new destination: ',
		default: undefined
	},
	{
		type: 'list',
		name: 'isPrivate',
		choices: [
			'Public',
			'Private'
		],
		message: 'Select new privacy:',
		default: undefined
	}
]

module.exports = async (config, params) => {
	const { shortCode } = params;

	if (!config.authToken) {
		console.log('This action requires authentication!');
		return;
	}

	const answers = await prompt(questions);

	try {
		const resp = await axios.patch(
			`/links/${shortCode}`,
			{
				...answers,
				isPrivate: answers.isPrivate === 'Private' ? true : false
			}
		);

		const link = resp.data;
		if (link) {
			console.log('Link updated!');
		}
		else {
			console.log('Didn\'t recieve a reply :(');
		}
	} catch (err) {
		const errorMap = {
			'SHORT_CODE_DNE': 'Invalid short code.',
			'UNAUTHORIZED': 'Thats not yours to delete!'
		};

		errorHandler(err, errorMap);
	}
}