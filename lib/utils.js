'use strict'

// support functions
let createDirective = function (header, payload) {
  return {
    'header': header,
    'payload': payload
  }
} // createDirective

let createMessageId = function () {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)

    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })

  return uuid
} // createMessageId

let createResHeaderName = function (reqName) {
  let code = require('./code')
  switch (reqName) {
    case code.REQUEST_HEALTHCHECK:
      return code.RESPONSE_HEALTHCHECK

    case code.REQUEST_DISCOVER:
      return code.RESPONSE_DISCOVER

    case code.REQUEST_TURN_ON:
      return code.RESPONSE_TURN_ON

    case code.REQUEST_TURN_OFF:
      return code.RESPONSE_TURN_OFF

    case code.REQUEST_SET_PERCENTAGE:
      return code.RESPONSE_SET_PERCENTAGE

    case code.REQUEST_INC_PERCENTAGE:
      return code.RESPONSE_INC_PERCENTAGE

    case code.REQUEST_DEC_PERCENTAGE:
      return code.RESPONSE_DEC_PERCENTAGE

    case code.REQUEST_SET_TEMPERATURE:
      return code.RESPONSE_SET_TEMPERATURE

    case code.REQUEST_INC_TEMPERATURE:
      return code.RESPONSE_INC_TEMPERATURE

    case code.REQUEST_DEC_TEMPERATURE:
      return code.RESPONSE_DEC_TEMPERATURE

    case code.REQUEST_GET_LOCK_STATE:
      return code.RESPONSE_GET_LOCK_STATE

    case code.REQUEST_SET_LOCK_STATE:
      return code.RESPONSE_SET_LOCK_STATE

    case code.REQUEST_GET_TEMPERATURE_READING:
      return code.RESPONSE_GET_TEMPERATURE_READING

    case code.REQUEST_GET_TARGET_TEMPERATURE:
      return code.RESPONSE_GET_TARGET_TEMPERATURE
  }
}

let createHeader = function (namespace, name) {
  return {
    'messageId': createMessageId(),
    'namespace': namespace,
    'name': name,
    'payloadVersion': '2'
  }
} // createHeader

module.exports = {
  createDirective: createDirective,
  createHeader: createHeader,
  createResHeaderName: createResHeaderName
}
