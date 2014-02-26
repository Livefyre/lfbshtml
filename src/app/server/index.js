/**
 * @fileoverview Entry point for public http api
 */

var express = require('express'),
    app = express(),
    api = require('./api');

app.get('/ping', api.ping);
app.get('/api/v1.0/bootstrap/:bstype/', api.bootstrap);

module.exports = app;
