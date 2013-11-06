var fs = require('fs'),
    config = {};

// try to import config
try {
    var json = JSON.parse(fs.readFileSync(__dirname + '/../config.json', 'utf-8'));

    // remove irt_ prefix from json keys (way to ID IRT pyyacc settings)
    for (var i in json) {
        json[key] = json[i];
        delete json[i];
    }


} catch (err) {
    console.error("Unable to read config.json file. Failing.");
    process.exit(1);
}

module.exports = config;