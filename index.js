'use strict';

let code = require('./lib/code');
let utils = require('./lib/utils');

let Alehos = function() {
  this.code = code;
  this.getHlrFn = utils.getHlrFn;
  this.createDirective = utils.createDirective;
};

Alehos.prototype.handler = function(event, context, cb) {
  let type = event && event.header && event.header.name;
  this._handFn = this.getHlrFn(type);

  // without supported function
  if (this._handFn === undefined) {
    let err = new Error();
    err.code = this.code.ERROR_UNSUPPORTED_OPERATION;
    return cb(null, this.createDirective(err));
  }

  let req = {
    event: event,
    context: context
  };
  this._handFn(req, res => {
    return cb(null, this.createDirective(res));
  });
};

module.exports = Alehos;
