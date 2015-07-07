'use strict';

var mowerClass = require('./src/mower-class'),
    filesReader = require('./src/files-reader');

var dirName= __dirname + '/fixtures/';

//Reading all files in fixtures/ directory
filesReader(dirName, function(err, data) {
    if(err) {
        console.error('Something goes wrong with reading files :', err);
        return;
    }

    //For each mower we make moves and display results
    data.mowers.forEach(function(mower, j) {
        var instance = new mowerClass(mower.initPos.x, mower.initPos.y, mower.initPos.ori, data.size);
        //Making all moves by inc the moves string
        for(var i in mower.parcours) {
            instance.movePosition(mower.parcours[i]);
        }
        console.log('===========================Tondeuse N°', (parseInt(j)+1) +'===============================');
        console.log('Taille de la pelouse :', data.size[0]+ 'x' +data.size[1]);
        console.log('Position initial     :', data.mowers[j].initPos.x, data.mowers[j].initPos.y, data.mowers[j].initPos.ori);
        console.log('Movements            :', data.mowers[j].parcours);
        console.log('Position final       :', instance.x, instance.y, instance.ori);
        console.log('\n');
    });
});
