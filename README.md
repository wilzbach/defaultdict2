defaultdict
===========

Returns a new dictionary-like object

Behaves __exactly__ like Python's defaultdict.


`defaultdict(default_factory, initial_dict)`

`default_factory`: value or function to be used for missing keys
`initial_dict`: (optional) dictionary to start with

Getting started
---------------

The first argument is the value for missing keys - it can be a value or function like in Python.

```
var p = defaultdict(0);
p.a++; 
p.b++;
console.log(p);
// { a: 1, b: 1 }
```

Same example using a function:

```
var p = defaultdict(()=>0);
p.a++; 
p.b++;
console.log(p);
// { a: 1, b: 1 }
```

The function will be called with two arguments `target_dict,name`.

Initial dictionary
-----------------

You can add an initial dictionary as second argument.

```
var p = defaultdict(0, {a: 1});
p.b++;
console.log(p);
// { a: 1, b: 1 }
```

Nested dictionaries
-------------------

There is no limit to your creativity!

```
var p = defaultdict(()=>defaultdict(0));
p.a.b++;
console.log(p);
// { a: { b: 1 } }
```

Gotchas
-------

1) Javascript doesn't allow string keys on dictionaries -> `h[20]` will create the key `'20'`

```
var p = defaultdict(0, {1: 1});
console.log(1 in p);
// false
console.log('1' in p);
// true
```

2) Be careful when checking for existence. Either use `in` or set the `d.default_factory` to `undefined`

```
var p = defaultdict(0, {a: 1});
console.log('b' in p);
// false
p.default_factory = undefined;
console.log(p.b);
// undefined
```

Requirements
------------

This depends on ES6 proxies. They should be part of your node version.
