var fs = require('fs'),
    config = {};

try {
    config = JSON.parse(fs.readFileSync(__dirname + '/../../config.json', 'utf-8'));
} catch (err) {
    console.error("Unable to read config.json file. Failing.");
    process.exit(1);
}

module.exports = config;
