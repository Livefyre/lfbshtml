/**
 * @fileoverview Process bootstrapper jobs
 * TODO(rrp): Handle errors, redis connection, ports, etc
 */

var kue = require('kue'),
    runner = require('./phantomrunner'),
    postBack = require('./postback'),
    jobs,
    statsClient = require('../util').getStatsClient();

require('../util').setRedisServer();
jobs = kue.createQueue();

module.exports = {
    start: function() {
        console.log('Starting bootstrap queue consumer');

        jobs.process('bootstrapper', function(job, done) {
            var args = job.data;
            console.log('Got job, running..');
            var startTime = Date.now();

            runner.run(args.bsType, args.data, function(rawData) {
                statsClient.increment('jobComplete');
                statsClient.timing('jobRunTime', Date.now() - startTime);
                console.log('Job complete, now postback..');

                postBack(args.callback, args.data, rawData);
                done();
            });
        });
    }
};
