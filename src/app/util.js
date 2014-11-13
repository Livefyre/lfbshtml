var url = require('url');
var config = require('../config');
var lynx = require('lynx');
var statsDClient = null;

module.exports = {
    getRedisSettings: function() {
        var port = config.BootstrapHtml.redis_port || process.env.REDISTOGO_URL || 6379,
            host = config.BootstrapHtml.redis_host;

        return {
            port: port,
            host: host
        };
    },

    getStatsClient: function() {
        if (statsDClient) {
            return statsDClient;
        }

        var host = config.BootstrapHtml.statsd_host.split('//')[1].split(':');
        var serverUrl = host[0];
        var serverPort = host[1];

        var scope = [config.environment.type, 'bshtml'].join('.');
        statsDClient = new lynx(serverUrl, serverPort, {
            scope: scope
        });
        console.log('StatsD client created at', serverUrl, serverPort);
        return statsDClient;
    }
};
