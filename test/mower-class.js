'use strict';

var expect = require('chai').expect,
    mowerClass = require('../src/mower-class');

describe('mower', function() {

    describe('constructor', function() {
        it('should create a mower when all params are present', function() {
            var mowerInstance = new mowerClass(0,3, 'N', [5, 5]);
            expect(mowerInstance).to.be.not.null;
            expect(mowerInstance.x).to.be.eql(0);
            expect(mowerInstance.y).to.be.eql(3);
            expect(mowerInstance.ori).to.be.eql('N');
            expect(mowerInstance.grass).to.be.eql([5,5]);
        });

        it('should trow an error when mower is too far to the EAST', function(done) {
            try {
                new mowerClass(0, 1, 'N', [0, 0]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when mower is too far to the NORTH', function(done) {
            try {
                new mowerClass(1, 0, 'N', [0, 0]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when initial orientation is wrong', function(done) {
            try {
                new mowerClass(0, 0, 'wrong', [0, 0]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when initial size of grass.x is wrong', function(done) {
            try {
                new mowerClass(0, 0, 'N', [-1, 0]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when initial size of grass.y is wrong', function(done) {
            try {
                new mowerClass(0, 0, 'S', [0, -1]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when there is wrong params type, 1st param ', function(done) {
            try {
                new mowerClass(null, 0, 'S', [0, -1]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when there is wrong params type, 2nd param', function(done) {
            try {
                new mowerClass(0, NaN, 'S', [0, -1]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when there is wrong params type, 3rd param', function(done) {
            try {
                new mowerClass(0, 0, [], [0, -1]);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });

        it('should trow an error when there is wrong params type, 4th param', function(done) {
            try {
                new mowerClass(null, 0, 'S', undefined);
                done('Should throw an error the line before');
            } catch (e) {
                expect(e).to.be.not.null;
                done();
            }
        });
    });

    describe('move ahead', function() {
        it('should go one case ahead to NORTH when oriented to north', function () {
            var mowerInstance = new mowerClass(0, 0, 'N', [0, 1]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.y).to.be.eql(1);
        });

        it('should go one case ahead to EAST when grass size is enough big', function () {
            var mowerInstance = new mowerClass(0, 0, 'E', [1, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.x).to.be.eql(1);
        });

        it('should go one case ahead to WEAST when grass size is enough big', function () {
            var mowerInstance = new mowerClass(1, 0, 'W', [1, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.x).to.be.eql(0);
        });

        it('should go one case ahead to SOUTH when grass size is enough big', function () {
            var mowerInstance = new mowerClass(0, 1, 'S', [0, 1]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.y).to.be.eql(0);
        });
    });

    describe('change direction to the Left', function() {
        it('should move from NORTH to WEAST', function () {
            var mowerInstance = new mowerClass(0, 0, 'N', [0, 0]);
            mowerInstance.movePosition('G');
            expect(mowerInstance.ori).to.be.eql('W');
        });
        it('should move from WEAST to SOUTH', function () {
            var mowerInstance = new mowerClass(0, 0, 'W', [0, 0]);
            mowerInstance.movePosition('G');
            expect(mowerInstance.ori).to.be.eql('S');
        });
        it('should move from SOUTH to EAST', function () {
            var mowerInstance = new mowerClass(0, 0, 'S', [0, 0]);
            mowerInstance.movePosition('G');
            expect(mowerInstance.ori).to.be.eql('E');
        });
        it('should move from EAST to NORTH', function () {
            var mowerInstance = new mowerClass(0, 0, 'E', [0, 0]);
            mowerInstance.movePosition('G');
            expect(mowerInstance.ori).to.be.eql('N');
        });
    });

    describe('change direction to the right', function() {
        it('should move from NORTH to EAST', function () {
            var mowerInstance = new mowerClass(0, 0, 'N', [0, 0]);
            mowerInstance.movePosition('D');
            expect(mowerInstance.ori).to.be.eql('E');
        });
        it('should move from EAST to SOUTH', function () {
            var mowerInstance = new mowerClass(0, 0, 'E', [0, 0]);
            mowerInstance.movePosition('D');
            expect(mowerInstance.ori).to.be.eql('S');
        });
        it('should move from SOUTH to WEAST', function () {
            var mowerInstance = new mowerClass(0, 0, 'S', [0, 0]);
            mowerInstance.movePosition('D');
            expect(mowerInstance.ori).to.be.eql('W');
        });
        it('should move from WEAST to NORTH', function () {
            var mowerInstance = new mowerClass(0, 0, 'W', [0, 0]);
            mowerInstance.movePosition('D');
            expect(mowerInstance.ori).to.be.eql('N');
        });
    });

    describe('don\'t move when you can\'t', function() {
        it('should log an error when ', function() {
            var mowerInstance = new mowerClass(0, 0, 'S', [0, 0]);
            mowerInstance.movePosition();
            expect(mowerInstance.y).to.be.eql(0);
            expect(mowerInstance.x).to.be.eql(0);
            expect(mowerInstance.ori).to.be.eql('S');
        });

        it('shouldn\'t move to SOUTH when it can\'t', function() {
            var mowerInstance = new mowerClass(0, 0, 'S', [0, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.y).to.be.eql(0);
        });

        it('shouldn\'t move to NORTH when it can\'t', function() {
            var mowerInstance = new mowerClass(0, 0, 'N', [0, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.y).to.be.eql(0);
        });

        it('shouldn\'t move to EAST when it can\'t', function() {
            var mowerInstance = new mowerClass(0, 0, 'E', [0, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.x).to.be.eql(0);
        });

        it('shouldn\'t move to WEAST when it can\'t', function() {
            var mowerInstance = new mowerClass(0, 0, 'W', [0, 0]);
            mowerInstance.movePosition('A');
            expect(mowerInstance.x).to.be.eql(0);
        });
    });
});
