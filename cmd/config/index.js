var prompt = require('prompt');
var conf = require('../../com/configure');

var exec = function () {
    var schema = {
        properties: {
            secretId: {
                description: 'secretId',
                required: !conf.get('secretId')
            },
            secretKey: {
                description: 'secretKey',
                hidden: true,
                required: !conf.get('secretKey')
            },
            appId: {
                description: 'appId',
                required: !conf.get('appId')
            },
            projectId: {
                description: 'projectId',
                required: !conf.get('projectId')
            },
            projectRegion: {
                description: 'projectRegion',
                required: !conf.get('projectRegion')
            }
        }
    };
    prompt.start();
    prompt.get(schema, function (err, result) {
        result.secretId && conf.set('secretId', result.secretId);
        result.secretKey && conf.set('secretKey', result.secretKey);
        result.appId && conf.set('appId', result.appId);
        result.projectId && conf.set('projectId', result.projectId);
        result.projectRegion && conf.set('projectRegion', result.projectRegion);
        console.log('config updated:');
        console.log(JSON.stringify(conf.get(), null, '    '));
    });
};

module.exports = exec;