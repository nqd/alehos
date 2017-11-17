'use strict'

let utils = require('./utils')
let code = require('./code')

let genRes = function (req, res) {
  let resName = (res.err)
    ? (res.err.code || code.ERROR_DRIVER_INTERNAL) : utils.createResHeaderName(req.event.header.name)

  let resNamespace = req.event.header.namespace
  let header = utils.createHeader(resNamespace, resName)

  let resPayload = (res.payload) ? res.payload : {}

  return utils.createDirective(header, resPayload)
}

module.exports = {
  genRes: genRes
}
