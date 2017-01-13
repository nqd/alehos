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

module.exports = {
  createDirective: createDirective,
  createHeader: createHeader,
  createMessageId: createMessageId,
};
