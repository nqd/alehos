# Alehos, Alexa homeskill built quickly

[![Build Status](https://travis-ci.org/nqd/alehos.svg?branch=master)](https://travis-ci.org/nqd/alehos)

So that you dont need to write boilerplate code for Alexa Home Skill with Nodejs.

FYI, look at [API reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/smart-home-skill-api-reference).

Note: this is the WIP, API may change.

# How to use

```
var alehos = require('alehos);

var app = new alehos();

app.discover = function(req, cb) {
  let payload = {
    "discoveredAppliances": [{
      "actions": [
        "incrementTargetTemperature",
        "decrementTargetTemperature",
        "setTargetTemperature"
      ],
      "additionalApplianceDetails": {},
      "applianceId": "uniqueThermostatDeviceId",
      "friendlyDescription": "descriptionThatIsShownToCustomer",
      "friendlyName": " Bedroom Thermostat",
      "isReachable": true,
      "manufacturerName": "yourManufacturerName",
      "modelName": "fancyThermostat",
      "version": "your software version number here."
    }, {
      "actions": [
        "incrementPercentage",
        "decrementPercentage",
        "setPercentage",
        "turnOn",
        "turnOff"
      ],
      "additionalApplianceDetails": {},
      "applianceId": "uniqueLightDeviceId",
      "friendlyDescription": "descriptionThatIsShownToCustomer",
      "friendlyName": "Living Room",
      "isReachable": true,
      "manufacturerName": "yourManufacturerName",
      "modelName": "fancyLight",
      "version": "your software version number here."
    }]
  };
  cb(null, payload);
};

app.onoff = function(req, cb) {
  // check if the request is on/off by looking at req.event.header.name
  // action
  // finally return OK
  cb(null);
};

exports.handler = app.handler;
```

## supported functions
- `discover` for discovery
- `onoff` for turn on and turn off handling
- `temperature` for set temperature, increase temperature, decrease temperature handling
- `percentage` for set percentage, increase percentage, decrease percentage
- `healthCheck` for service availability handling

If you don't provide equivalent function, the response will be UnsupportedOperationError.

## req
`req` is actually the `event` and `context` object from lambda request. You should looking at event for request message.

## cb
`cb` is the response function.

If you want to return error, generate an new error object, with code of the intented error.
Example:
```
app.onoff = function(req, cb) {
  // if the device is un reachable
  var err = new Error();
  err.code = app.code.ERROR_TARGET_OFFLINE;
  cb(err);
};
```

# Coding style
See [https://github.com/felixge/node-style-guide](https://github.com/felixge/node-style-guide)

# License

MIT
