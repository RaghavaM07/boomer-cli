const axios = require('../axiosInstance');
const errorHandler = require('../errorHandler');

module.exports = async (config, params) => {
    const { shortCode } = params;

    if (!config.authToken) {
        console.log('This action requires authentication!');
        return;
    }

    try {
        const resp = await axios.get(`/links/${shortCode}`);

        const { link, clicks } = resp.data;

        console.log(`Analytics of '${shortCode}':`);
        console.log('=========================================');
        console.log(`Destination: ${link.dest}`)
        console.log(`Clicks: ${clicks.length}`);
        if (clicks.length > 0) {
            console.log('=========================================');
            tabData = clicks.map(x => {
                return {
                    'Time': x.createdAt,
                    'By': !x.clicker ? 'Public Click' : x.clicker,
                    'IP': x.ip,
                    'Location': `${x.location.city}/${x.location.country}`
                };
            })

            console.table(tabData);
        }
    } catch (err) {
        const errorMap = {
            'SHORT_CODE_DNE': 'Invalid short code.',
            'UNAUTHORIZED': 'That\'s not yours to delete!',
            'COULD_NOT_GET_ANALYTICS': 'No analytics could be found!'
        };

        errorHandler(err, errorMap);
    }
}