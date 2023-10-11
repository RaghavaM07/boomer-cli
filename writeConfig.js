const { readJson, writeJson } = require('fs-extra');

const path = 'config.json';

module.exports = (key, value) => {
	readJson(path, (error, config) => {
		if (error) {
			console.error(error);
			console.log('An error has occurred while reading the config!');
			return;
		}
		config[key] = value;
		writeJson(path, config, (error) => {
			if (error) {
				console.log('An error has occurred while writing the config!');
				return;
			}
		});
	});
}