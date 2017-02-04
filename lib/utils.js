'use strict';

// support functions
let createDirective = function(header, payload) {
  return {
    'header' : header,
    'payload' : payload
  };
}; //createDirective

let createMessageId = function() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);

    return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });

  return uuid;
}; // createMessageId

let createResHeaderName = function(reqName) {
  let code = require('./code');
  switch (reqName) {
    case code.REQUEST_HEALTHCHECK:
    return code.RESPONSE_HEALTHCHECK;

    case code.REQUEST_DISCOVER:
    return code.RESPONSE_DISCOVER;

    case code.REQUEST_TURN_ON:
    return code.RESPONSE_TURN_ON;

    case code.REQUEST_TURN_OFF:
    return code.RESPONSE_TURN_OFF;

    case code.REQUEST_SET_PERCENTAGE:
    return code.RESPONSE_SET_PERCENTAGE;

    case code.REQUEST_INC_PERCENTAGE:
    return code.RESPONSE_INC_PERCENTAGE;

    case code.REQUEST_DEC_PERCENTAGE:
    return code.RESPONSE_DEC_PERCENTAGE;

    case code.REQUEST_SET_TEMPERATURE:
    return code.RESPONSE_SET_TEMPERATURE;

    case code.REQUEST_INC_TEMPERATURE:
    return code.RESPONSE_INC_TEMPERATURE;

    case code.REQUEST_DEC_TEMPERATURE:
    return code.RESPONSE_DEC_TEMPERATURE;
  }
};

let createHeader = function(namespace, name) {
  return {
    'messageId': createMessageId(),
    'namespace': namespace,
    'name': name,
    'payloadVersion': '2'
  };
}; // createHeader

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
    res.code : createResHeaderName(req.event.header.name);

  if (res instanceof Error) {
    header = createHeader(resNamespace, resName);
    return createDirective(header, {});
  }

  // else
  if (res instanceof Object) {
    header = createHeader(resNamespace, resName);
    return createDirective(header, res);
  }
};

module.exports = {
  createHeader: createHeader,
  createMessageId: createMessageId,
  getHlrFn: getHlrFn,
  genRes: genRes,
};
