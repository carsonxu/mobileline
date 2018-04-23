var router = require('../com/router');

var commands = {
    '-v': '--version',
    '--version': require('./index/version'),
    'ls': require('./project/ls'),
    'use': require('./project/use'),
    'config': require('./config/config'),
    'deploy': require('./hosting/deploy'),
};

module.exports = router(commands);