var configure = require('../../com/configure');
var cloudApi = require('../../com/cloudapi');

var exec = function () {
    var projectKey = configure.get('projectKey');
    cloudApi.ListProject(function (err, list) {
        list = list.map(function (item) {
            var line = item.project_key;
            if (projectKey === item.project_key) {
                line = '* ' + line + ' (Current Project)';
            } else {
                line = '  ' +  line;
            }
            return line;
        });
        console.log('exist projects:\n' + list.join('\n'));
    });
};

module.exports = exec;