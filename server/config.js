// Config
var defaults = require('../config/defaults');

for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
        process.env[key] = process.env[key] || defaults[key];
    }
}