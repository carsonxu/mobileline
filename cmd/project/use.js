var configure = require('../../com/configstore');
var cloudApi = require('../../com/cloudapi');

var exec = function (argv) {
    cloudApi.ListProject(function (err, list) {
        var projectMap = {};
        list.forEach(function (item) {
            projectMap[item.project_key] = item;
        });
        var projectKey = argv[0];
        var project = projectMap[argv[0]];
        if (project) {
            configure.set('projectKey', project.project_key);
            configure.set('projectRegion', project.region);
            cloudApi.GetAppId(function (err, appId) {
                configure.set('appId', appId);
                console.log('now using project ' + projectKey);
            });
        } else {
            console.log('project ' + projectKey + ' not exist');
        }
    });
};

module.exports = exec;