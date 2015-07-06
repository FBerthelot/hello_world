'use strict';

var tondeuseClass = require('./src/tondeuse-class'),
    filesReader = require('./src/files-reader');

var dirName= __dirname + '/fixtures/';

filesReader(dirName, function(err, data) {
    if(err) {
        console.error('Something goes wrong with reading files :', err);
        return;
    }

    data.tondeuses.forEach(function(tondeuse, j) {
        var instance = new tondeuseClass(tondeuse.initPos.x, tondeuse.initPos.y, tondeuse.initPos.ori, data.size);
        for(var i in tondeuse.parcours) {
            instance.movePosition(tondeuse.parcours[i]);
        }
        console.log('===========================TONDEUSE N°', (parseInt(j)+1) +'===============================');
        console.log('Taille de la pelouse :', data.size[0]+ 'x' +data.size[1]);
        console.log('Position initial     :', data.tondeuses[j].initPos.x, data.tondeuses[j].initPos.y, data.tondeuses[j].initPos.ori);
        console.log('Movements            :', data.tondeuses[j].parcours);
        console.log('Position final       :', instance.x, instance.y, instance.ori);
        console.log('\n');
    });
});
