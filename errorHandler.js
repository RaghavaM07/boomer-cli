const authErrors = {
	'TOKEN_UNSPECIFIED': 'You need to be logged in to do this!',
	'TOKEN_INVALID': 'Invalid login credentials! Plz login again.'
}

module.exports = (err, errorMap) => {
	errorMap = { ...errorMap, ...authErrors }

	if (errorMap['misc'] === undefined)
		errorMap['misc'] = 'An error occured! Plz try again later!';

	const { error } = err.response.data;

	if (errorMap[error] === undefined) {
		console.log(`Error Code: ${error}`);
		console.log('=================================================');
		console.error(errorMap['misc']);
	}
	else console.error(errorMap[error]);
}