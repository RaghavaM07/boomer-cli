const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

module.exports = async (config, params) => {
    const { shortCode } = params;

    if (!config.authToken) {
        console.log('This action requires authentication and is only valid for private links!');
        return;
    }

    try {
        const resp = await axios.get(`/${shortCode}`);

        const link = resp.data;
        const url = link.dest;
        const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(start + ' ' + url);
    } catch (err) {
        const errorMap = {
            'SHORT_CODE_DNE': 'Invalid short code.',
            'UNAUTHORIZED': 'That\'s not yours to delete!',
            'COULD_NOT_GET_ANALYTICS': 'No analytics could be found!'
        };

        errorHandler(err, errorMap);
    }
}