/**
 * @fileoverview Entry point for public http api
 */

var express = require('express'),
    app = express(),
    api = require('./api');

app.get('/api/v1.0/bootstrap/:bstype/', api.bootstrap);

// TODO(rrp): This extra set needed?
module.exports = exports = app;
