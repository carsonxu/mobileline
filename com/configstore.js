var ConfigStore = require('configstore');

var defaultConfig = {
    secretId: '',
    secretKey: '',
};
var configStore = new ConfigStore('mobileline', defaultConfig);

module.exports = configStore;