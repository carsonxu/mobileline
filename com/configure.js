var Configstore = require('configstore');

var defaultConfig = {
    secretId: '',
    secretKey: '',
    appId: '',
    projectId: '',
    projectRegion: '',
};
var conf = new Configstore('mobileline', defaultConfig);
module.exports = conf;