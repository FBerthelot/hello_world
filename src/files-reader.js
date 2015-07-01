'use strict';

var fs = require('fs');

module.exports = function filesReader(dirName, cb) {
    fs.readdir(dirName, function(err, files) {
        if(err) {
            cb && cb(err, null);
            return;
        }

        function readTondeuseFile(err, fd) {
            if(err) {
                cb && cb(err);
                return;
            }
            var lines = fd.split('\n');
            var data = {
                size : [parseInt(lines[0][0]), parseInt(lines[0][2])],
                tondeuses: []
            };

            for(var i = 1 ; i+1 < lines.length; i+=2) {
                var tondeuse = {
                    initPos: {
                        x: parseInt(lines[i][0]),
                        y: parseInt(lines[i][2]),
                        ori: lines[i][4]
                    },
                    parcourt: lines[i+1]
                };
                data.tondeuses.push(tondeuse);
            }
            cb && cb(null, data);
        }

        for(var i in files) {
            fs.readFile(dirName + '/' + files[i], {encoding : 'utf8', flag: 'r'}, readTondeuseFile);
        }
    });
};


