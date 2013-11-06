/**
 * @fileoverview Start the app server
 */

var server = require('./app/server'),
    config = require('./config');

server.listen(config.web_port);

console.log('starting server on port: ' + config.web_port);
process.on('exit', function() {
    console.log('stopping server');
});
