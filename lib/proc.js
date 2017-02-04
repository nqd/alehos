'use strict';

let utils = require('./utils');

let getHlrFn = function(type) {
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

    case this.code.REQUEST_SET_TEMPERATURE:
    case this.code.REQUEST_INC_TEMPERATURE:
    case this.code.REQUEST_DEC_TEMPERATURE:
    fn = this.temperature;
    break;

    case this.code.REQUEST_SET_PERCENTAGE:
    case this.code.REQUEST_INC_PERCENTAGE:
    case this.code.REQUEST_DEC_PERCENTAGE:
    fn = this.percentage;
    break;
  }
  return fn;
};

let genRes = function(req, res) {
  let resName = (res.err)?
    res.err.code : utils.createResHeaderName(req.event.header.name);

  let resNamespace = req.event.header.namespace;
  let header = utils.createHeader(resNamespace, resName);

  let resPayload = (res.payload)? res.payload : {};

  return utils.createDirective(header, resPayload);
};

module.exports = {
  getHlrFn: getHlrFn,
  genRes: genRes,
};
