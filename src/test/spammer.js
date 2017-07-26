/**
 * @fileoverview Just a test harness to put jobs and the queue and (hopefully)
 * get results back. Basically an end-to-end test
 */

var http = require('http');
var express = require('express');
var querystring = require('querystring');

// Set up server to handle postback fun
var postbackServer = express();
postbackServer.post('/handleBootstrap/', function(req, res) {
    var data = '';
    req.on('data', function(chunk) { 
       data += chunk.toString();
    });

    req.on('end', function() {
        console.log('Got data');
        console.log('Query data: ' + JSON.stringify(req.query));
        console.log('Some html too (len=' + data.length + ')');
        console.log(data);
        process.exit(0);
    });

    res.json(200, {
        'data': 'gotitthanks'
    });
});

postbackServer.listen(3003);
console.log('Postback server started');

var data = {
    "siteId": "351493",
    "articleId": 'Content-Venue-97495-en-GB',
    "networkId": "timeout.fyre.co",
    "app": "reviews"
};
var queryObj = {
    'callback': 'http://localhost:3003/handleBootstrap/',
    'data': JSON.stringify(data)
};

var queryString = querystring.stringify(queryObj);
var url = 'http://localhost:3002/api/v1.0/bootstrap/fyre.conv/?' + queryString;

console.log('Sending req');
http.get(url, function(res) {
    res.on('data', function(chunky) {
        console.log('Request result: ' + chunky.toString());
    });
});
