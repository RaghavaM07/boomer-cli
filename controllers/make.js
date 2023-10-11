const { prompt } = require('inquirer');

const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

const questions = [
	{
		type: 'input',
		name: 'shortCode',
		message: 'Enter a short code: '
	},
	{
		type: 'input',
		name: 'dest',
		message: 'Enter the URL to shorten: '
	},
	{
		type: 'list',
		name: 'isPrivate',
		choices: [
			'Public',
			'Private'
		],
		message: 'Is the link private?',
		default: 'Public'
	}
];

module.exports = async (config, params) => {
	const answers = await prompt(questions);

	try {
		console.log({
			...answers,
			isPrivate: answers.isPrivate === 'Private' ? true : false
		});

		const resp = await axios.post(
			'/links',
			{
				...answers,
				isPrivate: answers.isPrivate === 'Private' ? true : false
			}
		);

		const { link } = resp.data;
		console.log(`Successfully created link \`${link}\``);
	} catch (err) {
		const errorMap = {
			'FIELDS_UNSPECIFIED': 'All fields are required!',
			'SHORT_CODE_INUSE': 'Someone already claimed this short code! Maybe try another one?',
			'COULD_NOT_CREATE_LINK': 'We couldn\'t create the short link :( Plz try again!'
		};

		errorHandler(err, errorMap);
	}
}