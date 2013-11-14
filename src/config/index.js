var fs = require('fs'),
    config = {};

try {
    config = JSON.parse(fs.readFileSync(__dirname + '/../../config.json', 'utf-8'));
} catch (err) {
    console.error('Unable to read config.json file. Failing:', err);
    process.exit(1);
}

// set new relic variables
// (NOTE: this file must be imported before the new relic require)
if (config.environment.type !== 'dev') {
    process.env['NEW_RELIC_LICENSE_KEY'] = config.newrelic.license_key;
    process.env['NEW_RELIC_APP_NAME'] = 'Bootstrap HTML';
    console.info('Setting New Relic environment vars:');
    console.info('  License key: ' + process.env['NEW_RELIC_LICENSE_KEY']);
    console.info('  App name:    ' + process.env['NEW_RELIC_APP_NAME']);
}

module.exports = config;
