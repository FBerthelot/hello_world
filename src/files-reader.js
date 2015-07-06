'use strict';

var fs = require('fs');
var moveRegex = /^[ADG]*[ADG]*$/;

module.exports = function filesReader(dirName, cb) {
    fs.readdir(dirName, function(err, files) {
        if(err) {
            cb && cb(err, null);
            return;
        }
        for(var i in files) {
            fs.readFile(dirName + '/' + files[i], {encoding : 'utf8', flag: 'r'}, readTondeuseFile(files[i]));
        }
    });


    function readTondeuseFile(fileName) {
        return function(err, fd) {
            if (err) {
                cb && cb(err);
                return;
            }
            var lines = fd.split('\n');

            //check size of grass is ok and there is at least one tondeuse
            if (lines.length < 3 || lines[0].length !== 3 || isNaN(lines[0][0]) || isNaN(lines[0][2])) {
                cb && cb('File ' + fileName + ' is not well formatted');
                return;
            }


            var data = {
                size: [parseInt(lines[0][0]), parseInt(lines[0][2])],
                tondeuses: []
            };

            for (var i = 1; i + 1 < lines.length; i += 2) {
                //Check if the tondeuse is well formatted
                if(lines[i].length !== 5 || isNaN(lines[i][0]) || isNaN(lines[i][2]) || !lines[i+1].match(moveRegex)) {
                    var nbOfTondeuseInTheFile = i === 1 ? 1 : i / 2;
                    cb && cb('The tondeuse #'+ nbOfTondeuseInTheFile +' in file '+ fileName +' is not well formatted');
                    return;
                }

                var tondeuse = {
                    initPos: {
                        x: parseInt(lines[i][0]),
                        y: parseInt(lines[i][2]),
                        ori: lines[i][4]
                    },
                    parcours: lines[i + 1]
                };
                data.tondeuses.push(tondeuse);
            }
            cb && cb(null, data);
        };
    }
};


