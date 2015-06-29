'use strict';

var expect = require('chai').expect,
    tondeuseClass = require('../src/tondeuse-class');

describe('Tondeuse', function() {
    describe('constructor', function() {
        it('should create a tondeuse when all params are present', function() {
            var tondeuseInstance = new tondeuseClass(0,3, 'N', [5, 5]);
            expect(tondeuseInstance).to.be.not.null;
            expect(tondeuseInstance.x).to.be.eql(0);
            expect(tondeuseInstance.y).to.be.eql(3);
            expect(tondeuseInstance.ori).to.be.eql('N');
            expect(tondeuseInstance.grass).to.be.eql([5,5]);
        });
    });

    describe('move ahead', function() {
        it('should go one case ahead to NORTH when oriented to north', function () {
            var tondeuseInstance = new tondeuseClass(0, 0, 'N', [0, 1]);
            tondeuseInstance.movePosition('A');
            expect(tondeuseInstance.y).to.be.eql(1);
        });

        it('should go one case ahead to EAST when grass size is enough big', function () {
            var tondeuseInstance = new tondeuseClass(0, 0, 'E', [1, 0]);
            tondeuseInstance.movePosition('A');
            expect(tondeuseInstance.x).to.be.eql(1);
        });

        it('should go one case ahead to WEAST when grass size is enough big', function () {
            var tondeuseInstance = new tondeuseClass(1, 0, 'W', [1, 0]);
            tondeuseInstance.movePosition('A');
            expect(tondeuseInstance.x).to.be.eql(0);
        });

        it('should go one case ahead to SOUTH when grass size is enough big', function () {
            var tondeuseInstance = new tondeuseClass(0, 1, 'S', [0, 1]);
            tondeuseInstance.movePosition('A');
            expect(tondeuseInstance.y).to.be.eql(0);
        });
    });
});
