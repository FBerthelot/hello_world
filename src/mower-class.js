'use strict';

/**
 * Mower Class Constructor
 * @param initX int initial x mower's position
 * @param initY int initial y mower's position
 * @param initOri char initial orientation position can onlyh be N, S ,E or W
 * @param sizeOfGrass array size of the grass, the array must be like [ xSize, ySize]
 */
module.exports = function mower(initX, initY, initOri, sizeOfGrass) {
    if(typeof initX !== 'number' || typeof initY !== 'number' || typeof initOri !== 'string' || typeof sizeOfGrass !== 'object') {
        throw 'wrong arguments passed';
    }
    if(initX > sizeOfGrass[0] || initY > sizeOfGrass[1]) { throw 'initial position of the mower excedeed the size of grass'; }
    if(['N', 'S', 'E', 'W'].indexOf(initOri) === -1) { throw 'initial orientation is wrong'; }
    if(sizeOfGrass.length < 2 || typeof sizeOfGrass[0] !== 'number' || typeof sizeOfGrass[1] !== 'number' || sizeOfGrass[0] < 0 || sizeOfGrass[1] < 0 ) {
        throw 'size of grass is wrong';
    }

    this.grass = sizeOfGrass;
    this.x = initX;
    this.y = initY;
    this.ori = initOri;

    /**
     * function which move mower
     * @param move sting different moves are possible A, G or D
     */
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
