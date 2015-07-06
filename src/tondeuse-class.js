'use strict';

module.exports = function tondeuse(initX, initY, initOri, sizeOfGrass) {
    if(typeof initX !== 'number' || typeof initY !== 'number' || typeof initOri !== 'string' || typeof sizeOfGrass !== 'object') {
        throw 'wrong arguments passed';
    }
    if(initX > sizeOfGrass[0] || initY > sizeOfGrass[1]) { throw 'initial position of the tondeuse excedeed the size of grass'; }
    if(['N', 'S', 'E', 'W'].indexOf(initOri) === -1) { throw 'initial orientation is wrong'; }
    if(sizeOfGrass.length < 2 || typeof sizeOfGrass[0] !== 'number' || typeof sizeOfGrass[1] !== 'number' || sizeOfGrass[0] < 0 || sizeOfGrass[1] < 0 ) {
        throw 'size of grass is wrong';
    }

    this.grass = sizeOfGrass;
    this.x = initX;
    this.y = initY;
    this.ori = initOri;

    this.movePosition = function movePosition(move) {
        switch(move) {
            case 'A':
                switch(this.ori) {
                    case 'N':
                        if(this.y < this.grass[1]) {
                            this.y++;
                        }
                        break;
                    case 'E':
                        if(this.x < this.grass[0]) {
                            this.x++;
                        }
                        break;
                    case 'W':
                        if(this.x > 0) {
                            this.x--;
                        }
                        break;
                    case 'S':
                        if(this.y > 0) {
                            this.y--;
                        }
                        break;
                }
                break;
            case 'G':
                switch(this.ori) {
                    case 'N':
                        this.ori = 'W';
                        break;
                    case 'E':
                        this.ori = 'N';
                        break;
                    case 'W':
                        this.ori = 'S';
                        break;
                    case 'S':
                        this.ori = 'E';
                        break;
                }
                break;
            case 'D':
                switch(this.ori) {
                    case 'N':
                        this.ori = 'E';
                        break;
                    case 'E':
                        this.ori = 'S';
                        break;
                    case 'W':
                        this.ori = 'N';
                        break;
                    case 'S':
                        this.ori = 'W';
                        break;
                }
                break;
            default :
                console.error('Move unautorized', move);
                break;
        }
    };
};
