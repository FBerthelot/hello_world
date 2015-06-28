'use strict';

var tondeuse = require('./src/tondeuse-class'),
    filesReader = require('./src/files-reader');

filesReader(function(err, data) {
    if(err) {
        console.error('Something goes wrong with reading files :', err);
        return;
    }

    for(var j in data.tondeuses) {
        var instance = new tondeuse(data.tondeuses[j].initPos.x, data.tondeuses[j].initPos.y, data.tondeuses[j].initPos.ori, data.size);
        for(var i in data.tondeuses[j].parcourt) {
            instance.movePosition(data.tondeuses[j].parcourt[i]);
        }
        console.log(instance);
    }
});
