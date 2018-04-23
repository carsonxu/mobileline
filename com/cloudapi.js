var request = require('request');
var crypto = require('crypto');
var configure = require('./configure');

var config = {
    CLOUD_API: 'https://111.230.161.197',
    CLOUD_HOST: 'tac.tencentcloudapi.com',
    SecretId: configure.get('secretId'),
    SecretKey: configure.get('secretKey'),
};

function json2str(obj) {
    var arr = [];
    Object.keys(obj).sort().forEach(function (item) {
        var value = obj[item];
        if(!value) {
            if(value === 0 || value === '0') {
                value = '0';
            } else {
                value = '';
            }
        }
        arr.push(item + '=' + value);
    });
    return arr.join('&');
}

function getSign(method, data) {
    var str = json2str(data);
    var $srcStr = method.toUpperCase() + config.CLOUD_HOST + '/?' + str;
    return crypto.createHmac('sha1', config.SecretKey).update($srcStr, 'utf8', 'utf8').digest().toString('base64')
}

function sendRequest(data, callback) {

    // 获取用户请求相关参数
    var method = 'GET';
    data.SecretId = config.SecretId;
    data.Nonce = Math.round(Math.random() * (20000 - 10000) + 10000);
    data.Timestamp = Math.floor(Date.now() / 1000);
    data.Signature = getSign(method, data);

    // 添加请求信息
    var reqOpt = {
        method: method,
        url: config.CLOUD_API,
        qs: data,
        headers: {
            host: config.CLOUD_HOST
        },
        rejectUnauthorized: false,
        proxy: 'http://dev-proxy.oa.com:8080',
    };

    // 发起请求
    request(reqOpt, function (err, response, body) {
        callback(JSON.parse(body))
    });
}

var api = {
    ListProject: function (callback) {
        sendRequest({Action: 'ListProject', Version: '2018-02-05'}, function (r) {
            callback(null, r.Response && r.Response.Data);
        });
    },
    GetAppId: function (callback) {
        sendRequest({Action: 'GetAppId', Version: '2018-02-05'}, function (r) {
            callback(null, r.Response && r.Response.AppId);
        });
    },
};
module.exports = api;

if (!module.parent) {
    // api.ListProject(function (r) {
    //     console.log(r);
    // });
    config.SecretId = 'AKIDXYY1Mg4HjJh15ptOV5NfWAksjhjWA331';
    config.SecretKey = 'JYhuf5ichAjO7DLA6kimgl11hVjwTbqi';
    sendRequest({Action: 'GetAppId', Version: '2018-02-05', Token: 'e1dcc15845677e2c81fc65e2d087ed76d9ef4a7410001'}, function (r) {
        console.log(r);
    });
}