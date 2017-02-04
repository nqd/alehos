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
  let header;

  let resNamespace = req.event.header.namespace;
  let resName = res instanceof Error?
    res.code : utils.createResHeaderName(req.event.header.name);

  if (res instanceof Error) {
    header = utils.createHeader(resNamespace, resName);
    return utils.createDirective(header, {});
  }

  // else
  if (res instanceof Object) {
    header = utils.createHeader(resNamespace, resName);
    return utils.createDirective(header, res);
  }
};

module.exports = {
  getHlrFn: getHlrFn,
  genRes: genRes,
};
