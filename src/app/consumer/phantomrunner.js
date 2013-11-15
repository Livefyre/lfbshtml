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
    data.host = hostMap[config.environment.host] + '.livefyre.com';

    var childArgs = [
        __dirname + '/../../phantom/bootstrapper.js',
        type,
        encodeURIComponent(JSON.stringify(data))
    ];

    console.log('Running phantom child proc to get bs data');
    var isOSX = !!process.platform.match(/darwin/);
    var opts = {
        maxBuffer: 500*1024
    };
    childProcess.execFile(binPath, childArgs, opts, function(err, stdout, stderr) {
        console.log('Phantom child process has run');
        if (err) {
            console.error('Something went wrong with phantom child proc');
            console.error(err);
            return;
        }
        if (stderr && !isOSX) {
            console.error('Something went wrong with phantom child proc');
            console.error(stderr);
            return;
        }
        callback(stdout);
    });
};
