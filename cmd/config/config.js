var prompt = require('../../com/prompt');
var conf = require('../../com/configstore');

var exec = function () {
    var schema = {
        properties: {
            secretId: {
                message: 'Input3 ',
                description: 'secretId',
                required: !conf.get('secretId')
            },
            secretKey: {
                message: 'Input ',
                description: 'secretKey',
                hidden: true,
                required: !conf.get('secretKey')
            },
        }
    };
    prompt.start();
    prompt.get(schema, function (err, result) {
        result.secretId && conf.set('secretId', result.secretId);
        result.secretKey && conf.set('secretKey', result.secretKey);
        console.log('config updated:');
        var config = conf.get();
        config.secretKey = config.secretKey.replace(/./g, '*');
        console.log(JSON.stringify(config, null, '    '));
        // console.log('  secretId:' + conf.get('secretId'));
        // console.log('  secretKey:' + conf.get('secretKey'));
        prompt.stop();
    });
};

module.exports = exec;