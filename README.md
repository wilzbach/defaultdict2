defaultdict2
============

Returns a new dictionary-like object

Behaves __exactly__ like Python's [defaultdict](https://docs.python.org/3/library/collections.html#collections.defaultdict).

```
npm install --save defaultdict2
```

`defaultdict(default_factory, initial_dict)`

`default_factory`: value or function to be used for missing keys
`initial_dict`: (optional) dictionary to start with

See [this live demo](http://jsbin.com/fiqecu/edit?js,console) to check whether
your browser implements Proxies (Edge, FF, Chrome).

Alternatively here's a [summary blog post](https://seb.wilzba.ch/b/2016/02/defaultdict-in-js) about defaultdict2.

Getting started
---------------

The first argument is the value for missing keys - it can be a value or function like in Python.

```
var defaultdict = require('defaultdict2');
var d = defaultdict(0);
d.a++; 
d.b++;
console.log(d);
// { a: 1, b: 1 }
```

The same example using a function:

```
var d = defaultdict(()=>0);
d.a++; 
d.b++;
console.log(d);
// { a: 1, b: 1 }
```

The function will be called with two arguments `target_dict,name`.

Initial dictionary
-----------------

You can add an initial dictionary as second argument.

```
var d = defaultdict(0, {a: 1});
d.b++;
console.log(d);
// { a: 1, b: 1 }
```

Nested dictionaries
-------------------

There is no limit to your creativity!

```
var d = defaultdict(()=>defaultdict(0));
d.a.b++;
console.log(d);
// { a: { b: 1 } }
```

Using in a browser
------------------

Unfortunately ES6 proxies aren't fully adopted in browsers,
so this might not work in every browser.

However Edge, FF and Chrome (>49) support it.

### Embedding in your client script

### A) Traditional include


```
<script src="https://cdn.rawgit.com/greenify/defaultdict2/master/src/index.js"></script>
```

### B) With webpack or browserify

If you use webpack or browserify, please require the browser-part of defaultdict:

```
var defaultdict = require('defaultdict/browser');
```

### C) Bower


```
bower install --save defaultdict2
```

And then the script to your page 

```
<script src=".../bower_components/defaultdict2/src/index.js"></script>
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

License
-------

The MIT License
