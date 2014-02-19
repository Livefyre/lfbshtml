/**
 * @fileoverview Run phantom bootstrapper jobs
 * Spawns a child process to run the phantomjs job, with a callback on
 * completion
 */

var childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path,
    config = require('../../config');

// Host mapping of environments to js livefyre.js file hosts
var hostMap = {
    'prod': 'zor',
    'staging': 'zor.t402',
    'qa': 'zor.qa-ext'
};

/**
 * @param {string} type
 * @param {Object} data
 * @param {function()} callback
 */
exports.run = function(type, data, callback) {
    data.host = (hostMap[config.environment.type] || 'zor') + '.livefyre.com';

    var childArgs = [
        '--load-images=false',
        '--disk-cache=true',
        __dirname + '/../../phantom/bootstrapper.js',
        type,
        encodeURIComponent(JSON.stringify(data))
    ];

    console.log('Running phantom child proc to get bs data', data);
    var phantomInst = childProcess.spawn(binPath, childArgs),
        html = '';

    phantomInst.stdout.on('data', function(data) {
        html += data.toString();
    });

    phantomInst.on('error', function(err) {
        console.error('Something went wrong with phantom child proc');
        console.error(err.toString());
    });

    phantomInst.on('close', function() {
        callback(html);
    });
};
