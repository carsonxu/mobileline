var router = require('../com/router');

var commands = {
    'index': require('./index/index'),
    'config': require('./config/index'),
    'hosting': require('./hosting/index'),
};

module.exports = router(commands);