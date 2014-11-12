/**
 * @fileoverview Process bootstrapper jobs
 * TODO(rrp): Handle errors, redis connection, ports, etc
 */

var kue = require('kue');
var runner = require('./phantomrunner');
var postBack = require('./postback');
var jobs;
var util = require('../util');
var statsClient = util.getStatsClient();

jobs = kue.createQueue({
    prefix: 'lfbshtml',
    disableSearch: true,
    redis: util.getRedisSettings()
});

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
