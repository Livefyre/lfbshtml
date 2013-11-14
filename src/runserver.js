/**
 * @fileoverview Start the app server
 */

var server = require('./app/server'),
    config = require('./config'),
    port = process.argv.length > 2 ? process.argv[2] : config.BootstrapHtml.web_port,
    newrelic;

// new relic (all envs except localdev)
if (config.environment.type !== 'dev') {
    newrelic = require('newrelic');
}

console.log('starting server on port: ' + port);
server.listen(port);
process.on('exit', function() {
    console.log('stopping server');
});
