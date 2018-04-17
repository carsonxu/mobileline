var pkg = require('../../package');

module.exports = function (argv) {
    if (argv[0] === '-v' || argv[0] === '--version') {
        console.log('v' + pkg.version);
    } else {
        console.log('try mline ls');
    }
};