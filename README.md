# Alehos, Alexa Home Skill SDK

[![Build Status](https://travis-ci.org/nqd/alehos.svg?branch=master)](https://travis-ci.org/nqd/alehos)

So that you dont need to write boilerplate code for Alexa Home Skill with Nodejs.

FYI, look at [API reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference).

# How to use

```
var alehos = require('alehos);

var app = new alehos();

app.discover = function(req, res) {
  res.send({});
};

app.temperature = function(req, res) {
  res.send({});
};

app.percentage = function(req, res) {
  res.send({});
};

app.healthCheck = function(req, res) {
  res.send({});
};

exports.handler = app;
```

# Coding style
See [https://github.com/felixge/node-style-guide](https://github.com/felixge/node-style-guide)

# License

MIT