var assert = require('assert');
// var LocationIndex = require('../js/LocationIndex.mjs');
// var Location = require('../js/Location.mjs');
// var Util = require('../js/Util.js');

import { LocationIndex } from "./LocationIndex.mjs";
import { Location } from "./Location.mjs";

describe('LocationIndex test', function() {
    it('Should throw exception when inserting with no object', function() {
        var index = new LocationIndex();
        assert.throws(
            function() {
                index.insert(null)
            }
            , Error);
    });

    it('Should thow exception when inserting with no location', function() {
        var index = new LocationIndex();
        assert.throws(
            function() {
                index.insert(new Object(), null)
            }
            , Error);
    });

    it('Should not throw exception when valid input', function() {
        var index = new LocationIndex();
        assert.doesNotThrow(
            function() {
                index.insert(new Object(), new Location(1,2))
            }, Error);
    });

    it('Should increase size when adding', function() {
        var index = new LocationIndex();
        index.insert(new Object(), new Location(1,2));

        assert.equal(index.size, 1);
    });
});

describe('LocationIndex remove tests', function() {
    it('Should decrease size when removing', function() {
        var index = new LocationIndex();
        var obj = new Object();
        var loc = new Location(1,2);
        index.insert(obj, loc);
        index.remove(obj, loc);
    
        assert.equal(index.getSize(), 0);
    });
    
    it('Should throw exception when removing object that doesnt exist', function() {
        
        assert.throws(
            function() {
                var index = new LocationIndex();
                var obj = new Object();
                var loc = new Location(1,2);
                index.remove(obj, loc);
            } , Error);
    });
});


describe('LocationIndex find nearest tests', function() {
    it('Should find only existing on as nearest', function() {
        var index = new LocationIndex();
        var obj = new Object();
        var loc = new Location(1,2);
        index.insert(obj, loc);

        var closest = index.findNearest(new Location(3,4));

        assert.equal(loc, closest);
    });
    
    it('Should throw exception when removing object that doesnt exist', function() {
        
        assert.throws(
            function() {
                var index = new LocationIndex();
                var obj = new Object();
                var loc = new Location(1,2);
                index.remove(obj, loc);
            } , Error);
    });
});