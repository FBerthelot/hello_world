'use strict';

var fs = require('fs');
var moveRegex = /^[ADG]*[ADG]*$/;

/**
 * Function which read a whole directory file and return mowers informations
 * @param dirName string path to the directory to analyse
 * @param cb function callback which take 2 params err and data
 */
module.exports = function filesReader(dirName, cb) {
    fs.readdir(dirName, function(err, files) {
        if(err) {
            cb && cb(err, null);
            return;
        }
        files.forEach(function(file) {
            fs.readFile(dirName + '/' + file, {encoding : 'utf8', flag: 'r'}, readMowerFile(file));
        });
    });

    /**
     * Read a single file and call the callback when ended to read the file
     * @param fileName string path of the file
     */
    function readMowerFile(fileName) {
        return function(err, fd) {
            if (err) {
                cb && cb(err);
                return;
            }
            var lines = fd.split('\n');

            //check size of grass is ok and there is at least one mower
            if (lines.length < 3 || lines[0].length !== 3 || isNaN(lines[0][0]) || isNaN(lines[0][2])) {
                cb && cb('File ' + fileName + ' is not well formatted');
                return;
            }

            var data = {
                size: [parseInt(lines[0][0]), parseInt(lines[0][2])],
                mowers: []
            };

            for (var i = 1; i + 1 < lines.length; i += 2) {
                //Check if the mower is well formatted
                if(lines[i].length !== 5 || isNaN(lines[i][0]) || isNaN(lines[i][2]) || !lines[i+1].match(moveRegex)) {
                    var nbOfmowerInTheFile = i === 1 ? 1 : i / 2;
                    cb && cb('The mower #'+ nbOfmowerInTheFile +' in file '+ fileName +' is not well formatted');
                    return;
                }

                var mower = {
                    initPos: {
                        x: parseInt(lines[i][0]),
                        y: parseInt(lines[i][2]),
                        ori: lines[i][4]
                    },
                    parcours: lines[i + 1]
                };
                data.mowers.push(mower);
            }
            cb && cb(null, data);
        };
    }
};


