'use strict';

module.exports = function tondeuse(initX, initY, initOri, sizeOfGrass) {

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
                        if(this.x >= 0) {
                            this.x--;
                        }
                        break;
                    case 'S':
                        if(this.y >= 0) {
                            this.y--;
                        }
                        break;
                    default:
                        console.error('Something goes wrong if the tondeuse orientation', this.ori);
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
                    default:
                        console.error('Something goes wrong if the tondeuse orientation', this.ori);
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
                    default:
                        console.error('Something goes wrong if the tondeuse orientation', this.ori);
                        break;
                }
                break;
            default :
                console.error('Move unautorized', move);
                break;
        }
    };
};
