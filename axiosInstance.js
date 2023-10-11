const axios = require('axios').default;
const config = require('./config.json');

const baseURL = `${config.server.host}:${config.server.port}`;
const authToken = config.authToken;

module.exports = axios.create({
	baseURL,
	headers: {
		'Accept': 'application/json',
		'Authorization': authToken ? `Bearer ${authToken}` : undefined
	}
})