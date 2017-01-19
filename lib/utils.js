'use strict';

let createDirective = function(header, payload) {
  return {
    'header' : header,
    'payload' : payload
  };
}; // createDirective

// support functions
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

module.exports = {
  createDirective: createDirective,
  createHeader: createHeader,
  createMessageId: createMessageId,
  getHlrFn: getHlrFn,
};
