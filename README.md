# Alehos, Alexa Home Skill SDK

[![Build Status](https://travis-ci.org/nqd/alehos.svg?branch=master)](https://travis-ci.org/nqd/alehos)

So that you dont need to write boilerplate code for Alexa Home Skill with Nodejs.

# How to use

```
var alehos = require('alehos);

alehos.discover = function(req, res) {
  res.send({});
};

alehos.temperature = function(req, res) {
  res.send({});
};

alehos.percentage = function(req, res) {
  res.send({});
};

exports.handler = alehos;
```

# Coding style
See [https://github.com/felixge/node-style-guide](https://github.com/felixge/node-style-guide)

# License

MIT
