var router = function (commands) {
    var runner = function (argv) {
        var cmd1 = argv[0];
        if (!commands[cmd1]) {
            cmd1 = 'index';
        } else {
            argv = argv.slice(1);
        }
        if (commands[cmd1]) {
            commands[cmd1](argv);
        } else {
            console.warn('command not found');
        }
    };
    return runner;
};

module.exports = router;