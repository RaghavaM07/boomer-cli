module.exports = (controller, params) => {
	const conf = require('./config.json');

	return () => controller(conf, params);
}