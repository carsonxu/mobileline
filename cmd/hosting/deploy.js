var conf = require('../../com/configstore');
var COS = require('cos-nodejs-sdk-v5');
var util = require('../../com/util');
var path = require('path');
var fs = require('fs');


var cos = new COS({
    SecretId: conf.get('secretId'),
    SecretKey: conf.get('secretKey'),
    Proxy: 'http://dev-proxy.oa.com:8080',
});
var exec = function (argv, callback) {
    !callback && (callback = util.noop);

    var dirPath = path.resolve(process.cwd(), argv[0] || '');
    var Bucket = 'tac-' + conf.get('projectKey') + '-ho-' + conf.get('appId');
    var Region = conf.get('projectRegion');

    console.log('uploading dir: ' + dirPath);
    var cb = function (isSuccess) {
        console.log('upload finish.');
        callback(isSuccess);
    };
    util.listFiles(dirPath, function (list) {
        var count = list && list.length;
        if (count) {
            list.forEach(function (item) {
                var opt = {
                    Bucket: Bucket,
                    Region: Region,
                    Key: path.relative(dirPath, item.path).replace(/\\/g, '/'),
                    ContentLength: item.size,
                };
                var _cb = function (err, data) {
                    console.log('[' + (err ? 'error' : 'ok') + '] ' + item.path);
                    --count === 0 && cb(true);
                };
                if (item.isDir) {
                    opt.Body = Buffer.from('');
                    opt.Key += '/';
                    cos.putObject(opt, _cb);
                } else if (item.size <= 1024 * 1024) {
                    opt.Body = fs.createReadStream(item.path);
                    cos.putObject(opt, _cb);
                } else {
                    opt.FilePath = item.path;
                    cos.sliceUploadFile(opt, _cb);
                }
            });
        } else {
            cb(true);
        }
    });
};

module.exports = exec;
