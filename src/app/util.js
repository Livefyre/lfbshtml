var kue = require('kue'),
    redis = require('redis'),
    url = require('url'),
    config = require('../config');

module.exports = {
    setRedisServer: function() {
        var port = config.BootstrapHtml.redis_port || process.env.REDISTOGO_URL || 6379,
            host = config.BootstrapHtml.redis_host;

        kue.redis.createClient = function() {
            var client = redis.createClient(port, host);
            console.log('Redis client created at', host, 'port', port)
            return client;
        };
    }
};
