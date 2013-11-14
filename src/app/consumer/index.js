/**
 * @fileoverview Process bootstrapper jobs
 * TODO(rrp): Handle errors, redis connection, ports, etc
 */

var kue = require('kue'),
    runner = require('./phantomrunner'),
    postBack = require('./postback'),
    jobs;

require('../util').setRedisServer();
jobs = kue.createQueue();

exports.start = function() {
    console.log('Starting bootstrap queue consumer');
    jobs.process('bootstrapper', function(job, done) {
        var args = job.data;
        console.log('Got job, running..');
        runner.run(args.bsType, args.data, function(rawData) {
            console.log('Job complete, now postback..');
            postBack(args.callback, args.data, rawData);
            done();
        });
    });
};
