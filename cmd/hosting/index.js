var router = require('../../com/router');

var commands = {
    'upload': require('./upload'),
};

module.exports = router(commands);