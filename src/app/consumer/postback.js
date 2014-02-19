/**
 * @fileoverview Postback bootstapper results
 * TODO(rrp): Handle errors
 */
var http = require('http'),
    url = require('url'),
    querystring = require('querystring');

/**
 * @param {string} path
 * @param {Object} args
 */
function makePath(path, args) {
    var sep = '?';
    if (path.indexOf(sep) > -1) {
        sep = '&'
    }
    path += sep + querystring.stringify(args);
    return path;
};

/**
 * Post to the callbackurl with the rawData as the body and args as query params
 * @param {string} callbackUrl
 * @param {Object} queryParams
 * @param {string} rawData
 */
module.exports = function(callbackUrl, queryParams, rawData) {
    if (!/https?/.test(callbackUrl)) {
        callbackUrl = 'http://' + callbackUrl;
    }
    console.log('Postbacking to ' + callbackUrl);
    var parsedUrl = url.parse(callbackUrl),
        path = makePath(parsedUrl.path, queryParams);
        options = {
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(rawData),
                'Content-Type': 'text/html'
            }
        },

        req = http.request(options, function(res){
            res.setEncoding('utf8');
            res.on('data', function() {
                console.log('Postback success');
            });
        });

    req.on('error', function(e) {
        console.log('Problem with postback request: msg=' + e.message + ' url=' + callbackUrl);
    });

    req.end(rawData);
};
