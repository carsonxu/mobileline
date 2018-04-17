var path = require('path');
var fs = require('fs');

var util = {
    noop: function () {
    },
    listFiles: function (dirPath, callback) {
        var result = [];
        fs.readdir(dirPath, function (err, list) {
            var count = list && list.length;
            if (count) {
                list.forEach(function (filename) {
                    var filePath = path.resolve(dirPath, filename);
                    fs.stat(filePath, function (err, info) {
                        if (info.isDirectory(filePath)) {
                            util.listFiles(filePath, function (list) {
                                result.push({path: filePath, isDir: true, size: info.size});
                                result.push.apply(result, list);
                                --count === 0 && callback(result);
                            });
                        } else {
                            result.push({path: filePath, isDir: false, size: info.size});
                            --count === 0 && callback(result);
                        }
                    });
                });
            } else {
                callback(result);
            }
        });
    },
};

module.exports = util;

if (!module.parent) {
    util.listFiles(path.resolve(__dirname, '../cmd'), function (list) {
        console.log(list);
    });
}