'use strict';

let code = require('./lib/code');
let proc = require('./lib/proc');

let Alehos = function() {
  this.code = code;
  this.getHlrFn = proc.getHlrFn;
  this.genRes = proc.genRes;
};

Alehos.prototype.handler = function(event, context, cb) {
  let type = event && event.header && event.header.name;
  let req = {
    event: event,
    context: context
  };

  this._handFn = this.getHlrFn(type);

  // without supported function
  if (this._handFn === undefined) {
    let err = new Error();
    err.code = this.code.ERROR_UNSUPPORTED_OPERATION;
    return cb(null, this.genRes(req, err));
  }

  this._handFn(req, res => {
    return cb(null, this.genRes(req, res));
  });
};

module.exports = Alehos;
