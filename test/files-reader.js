'use strict';

var mockFS = require('mock-fs'),
    expect = require('chai').expect,
    filesReader = require('../src/files-reader');

describe('file reader', function() {
    before(function() {
        mockFS({
           'path/fake_dir' : {
               'test.js': '5 7\n2 4 N\nGAGAGAGAA'
           }
        });
    });

    it('shouldn\'t return an error and read the file properly', function(done) {
        filesReader('path/fake_dir', function(err, data) {
            expect(err).to.be.null;
            expect(data).to.be.an.object;
            done();
        });
    });

    describe('reader file when all is ok', function() {
        var dataReaded;
        before(function(done) {
            filesReader('path/fake_dir', function(err, data) {
                dataReaded = data;
                done();
            });
        });

        it('should have a grass size to [5, 7]', function() {
            expect(dataReaded.size.length).to.be.eql(2);
            expect(dataReaded.size[0]).to.be.eql(5);
            expect(dataReaded.size[1]).to.be.eql(7);
        });

        it('should position the tondeuse in the good way', function() {
            expect(dataReaded.tondeuses).to.be.an.object;
            expect(dataReaded.tondeuses.length).to.be.eql(1);
            expect(dataReaded.tondeuses[0].initPos.x).to.be.eql(2);
            expect(dataReaded.tondeuses[0].initPos.y).to.be.eql(4);
        });

        it('should oriented the tondeuse in the good way', function() {
            expect(dataReaded.tondeuses[0].initPos.ori).to.be.eql('N');
        });

        it('should read the good parcours', function() {
            expect(dataReaded.tondeuses[0].parcours).to.be.eql('GAGAGAGAA');
        });
    });
});
