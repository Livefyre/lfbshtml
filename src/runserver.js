/**
 * @fileoverview Start the app server
 */

var server = require('./app/server'),
    config = require('./config'),
    port = process.argv.length > 2 ? process.argv[2] : config.BootstrapHtml.web_port;

console.log('starting server on port: ' + port);
server.listen(port);
process.on('exit', function() {
    console.log('stopping server');
});
