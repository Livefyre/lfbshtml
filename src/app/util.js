var kue = require('kue'),
    redis = require('redis'),
    url = require('url'),
    config = require('../config'),
    lynx = require('lynx');

var statsDClient = null;

module.exports = {
    setRedisServer: function() {
        var port = config.BootstrapHtml.redis_port || process.env.REDISTOGO_URL || 6379,
            host = config.BootstrapHtml.redis_host;

        kue.redis.createClient = function() {
            var client = redis.createClient(port, host);
            console.log('Redis client created at', host, 'port', port)
            return client;
        };
    },

    getStatsClient: function() {
        if (statsDClient) {
            return statsDClient;
        }

        var host = config.BootstrapHtml.statsd_host.split('//')[1].split(':');
        var serverUrl = host[0];
        var serverPort = host[1];

        var scope = ['stats', config.environment.type, 'bshtml'].join('.');
        statsDClient = new lynx(serverUrl, serverPort, {
            scope: scope
        });
        console.log('StatsD client created at', serverUrl, serverPort);
        return statsDClient;
    }
};
