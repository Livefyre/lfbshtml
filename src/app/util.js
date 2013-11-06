var kue = require('kue'),
    redis = require('redis'),
    url = require('url'),
    config = require('../config');

exports.setRedisServer = function() {
    var port = config.redis_port || process.env.REDISTOGO_URL;
    var host = config.redis_host;

    kue.redis.createClient = function() {
        var client = redis.createClient(port, host);
        return client;
    };
};
