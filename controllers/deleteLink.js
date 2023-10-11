const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

module.exports = async (config, params) => {
	const { shortCode } = params;

	if (!config.authToken) {
		console.log('This action requires authentication!');
		return;
	}

	try {
		const resp = await axios.delete(`/links/${shortCode}`);

		const { del } = resp.data;
		if (del.deleted === true) {
			console.log(`Deleted link ${shortCode}`);
		} else {
			console.log(`Could not delete link ${shortCode}`);
		}
	} catch (err) {
		const errorMap = {
			'SHORT_CODE_DNE': 'Invalid short code.',
			'UNAUTHORIZED': 'Thats not yours to delete!'
		};

		errorHandler(err, errorMap);
	}
}