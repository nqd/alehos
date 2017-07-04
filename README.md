# Alehos, Alexa homeskill built quickly

[![Build Status](https://travis-ci.org/nqd/alehos.svg?branch=master)](https://travis-ci.org/nqd/alehos)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

So that you dont need to write boilerplate code for Alexa Home Skill with Nodejs.


Alehos support routing for the [Smart Home Skill API updated ~~February 28, 2017~~ ~~April 7, 2017~~ June 22, 2017](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference).

# How to use

```
let Alehos = require('alehos)

let alehos = new Alehos()

alehos.registerHandler('discovery', (req, cb) => {
  // get the payload
  cb(null, payload)
})

alehos.registerHandler('onoff', (req, cb) => {
  // check if the request is on/off by looking at req.event.header.name
  // action
  // finally return OK
  cb(null)
}

exports.handler = function(event, context, cb) {
  alehos.handle(event, context, cb)
}
```

## supported functions
- `discover`: discovery
- `onoff`: turn on and turn off handling
- `temperature`: set temperature, increase temperature, decrease temperature handling
- `percentage`: set percentage, increase percentage, decrease percentage
- `healthCheck`: service availability handling
- `lock`: query and controll door lock
- `color`: controll [tunable lighting](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#tunable-lighting-control-messages)
- `camera`: query [camera streaming](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference#smart-home-camera-messages)

If you don't provide equivalent function, the response will be `UnsupportedOperationError`.

## req
`req` is actually the `event` and `context` object from lambda request. You should looking at event for request message.

## cb
`cb` is the response function.

If you want to return error, generate an new error object, with code of the intented error.
Example:
```
// if the device is un reachable
let err = new Error()
err.code = alehos.code.ERROR_TARGET_OFFLINE
return cb(err)
```

# License

MIT
