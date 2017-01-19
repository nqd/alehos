'use strict';

let code = require('./lib/code');
let utils = require('./lib/utils');

let Alehos = function() {
  this.code = code;
};

Alehos.prototype._createDirective = function(res) {
  if (res instanceof Error) {
    return utils.createDirective(
      utils.createHeader(this.code.NAMESPACE_CONTROL, res.code),
      {}
    );
  }

  // else
  if (res instanceof Object) {
    return utils.createDirective(
      utils.createHeader(
        this.code.NAMESPACE_CONTROL,
        this.code.RESPONSE_HEALTHCHECK),
      res
    );
  }
};

Alehos.prototype.getHlrFn = function(type) {
  let fn;
  switch (type) {
    case this.code.REQUEST_HEALTHCHECK:
    fn = this.healthCheck;
    break;

    case this.code.REQUEST_DISCOVER:
    fn = this.discover;
    break;

    case this.code.REQUEST_TURN_ON:
    case this.code.REQUEST_TURN_OFF:
    fn = this.onoff;
    break;
  }
  return fn;
};

Alehos.prototype.handler = function(event, context, cb) {
  let type = event && event.header && event.header.name;
  this._handFn = this.getHlrFn(type);

  // without supported function
  if (this._handFn === undefined) {
    let err = new Error();
    err.code = this.code.ERROR_UNSUPPORTED_OPERATION;
    return cb(null, this._createDirective(err));
  }

  let req = {
    event: event,
    context: context
  };
  this._handFn(req, res => {
    return cb(null, this._createDirective(res));
  });
};

module.exports = Alehos;
