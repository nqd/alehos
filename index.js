'use strict';

let code = require('./lib/code');
let utils = require('./lib/utils');

let Alehos = function() {
  this.code = code;
};

Alehos.prototype._createDirective = function(res) {
  let msg;
  if (res && res.code === this.code.ERROR_UNSUPPORTED_OPERATION) {
    msg = utils.createDirective(
      utils.createHeader(
        this.code.NAMESPACE_CONTROL,
        this.code.ERROR_UNSUPPORTED_OPERATION),
      {}
    );
  }

  return msg;
};

Alehos.prototype.handler = function(event, context, cb) {
  let res = {};
  let type = event && event.header && event.header.name;
  switch (type) {
    case this.code.REQUEST_HEALTHCHECK:
    this._handFn = this.healthCheck;
    break;

    // default:
    // res.code = this.code.ERROR_UNSUPPORTED_OPERATION;
  }

  // without supported function
  if (this._handFn === undefined) {
    res.code = this.code.ERROR_UNSUPPORTED_OPERATION;
    return cb(null, this._createDirective(res));
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
