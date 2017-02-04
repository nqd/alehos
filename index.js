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

  let _handFnCb = (err, payload) => {
    let res = {
      err: err,
      payload: payload
    };
    return cb(null, this.genRes(req, res));
  };

  // without supported function
  if (this._handFn === undefined) {
    let err = new Error();
    err.code = this.code.ERROR_UNSUPPORTED_OPERATION;
    return _handFnCb(err);
  }
  // else, call the handler function
  this._handFn(req, _handFnCb);
};

module.exports = Alehos;
