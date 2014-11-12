/**
 * @fileoverview Takes request, places into queue for running later
 */

var kue = require('kue');
require('../util').setRedisServer();
var jobs = kue.createQueue({
    prefix: 'lfbshtml'
});
var statsClient = require('../util').getStatsClient();

module.exports = {}

module.exports.bootstrap = function(req, res) {
    var bsType = req.params.bstype;

    // TODO(rrp): Enum / setting types?
    if (bsType !== 'fyre.conv') {
        res.json(400, {error: 'Bad bootstrap type'});
        return;
    }

    var data = req.query.data;

    if (!data) {
        res.json(400, {error: 'Missing query param `data`'});
        return;
    }

    try {
        data = JSON.parse(data);
    } catch (e) {
        res.json(400, {error: 'Could not parse data object: ' + data});
        return;
    }

    var callback = req.query.callback;
    if (!data) {
        res.json(400, {error: 'Missing query param: ' + callback});
        return;
    }

    // Just add to queue if all is good.
    var job = jobs.create('bootstrapper', {
        bsType: bsType,
        data: data,
        callback: callback
    });

    job.removeOnComplete(true).save();

    console.log('Added job to `bootstrapper` queue');
    statsClient.increment('jobAdded');
    res.json(200, {message: 'Boostrap job successfully added'});
};

module.exports.ping = function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send('pong');
};
