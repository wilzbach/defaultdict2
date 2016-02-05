var chai = require("chai");
var assert = chai.assert;
var defaultdict = require("../");
var equal = assert.deepEqual;

describe('Defaultdict', function(){
    
    // tests are similar to Python's defaultdict basic tests
    it('should behave like python - basic', function(){
        d1 = defaultdict();
        assert.equal(d1.default_factory, undefined)
        d1.default_factory = [];
        d1[12].push(42)
        equal(d1, {12: [42]})

        d1[12].push(24)
        equal(d1, {12: [42, 24]})
        d1[13]
        d1[14]
        equal(d1, {12: [42, 24], 13: [], 14: []})

        assert.ok(d1[12] !== d1[13] && d1[13] !== d1[14])
        d2 = defaultdict([], {foo:1, bar:2})
        equal(d2.default_factory, [])
        equal(d2, {"foo": 1, "bar": 2})
        equal(d2["foo"], 1)
        equal(d2["bar"], 2)
        equal(d2[42], [])
        assert.ok("foo" in d2);
        assert.include(Object.keys(d2), "foo")
        assert.ok("bar" in d2);
        assert.include(Object.keys(d2), "bar")
        assert.ok("42" in d2);
        assert.include(Object.keys(d2), '42')
        assert.notOk("12" in d2);
        assert.notInclude(Object.keys(d2), '12')
        
    });


    it('behavior on undefined default_factory', function(){
        return;
        d2 = defaultdict([], {foo:1, bar:2})
        d2.default_factory = undefined
        equal(d2.default_factory, undefined)
        equal(d2["foo42"], undefined);
    });
});
