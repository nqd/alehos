'use strict'

let Alehos = require('../index')
let sinon = require('sinon')
let events = require('./events.json')
let _ = require('underscore')

let app

describe('Alehos', () => {
  beforeEach(() => {
    app = new Alehos()
  })
  it('should return not supported for not register service yet', () => {
    const event = events.reqHealthCheck
    const context = {}

    let cbSpy = sinon.spy()
    app.handle(event, context, cbSpy)
    let matched = sinon.match(obj => {
      return obj.header.name === 'UnsupportedOperationError'
    })
    sinon.assert.calledWith(cbSpy, null, matched)
  })

  it('should call the equivalent fuc with provided request type', () => {
    // given
    const event = events.reqHealthCheck
    const context = {}
    let healthCheck = sinon.spy()
    app.registerHandler('healthCheck', healthCheck)
    // when
    app.handle(event, context, (_err, _payload) => {})
    // then
    sinon.assert.calledWith(
      healthCheck,
      sinon.match.has('event', event).and(sinon.match.has('context', context))
    )
  })

  it('should return the right payload from equivalent fnc', () => {
    // given
    const event = events.reqHealthCheck
    const context = {}
    const healthCheckRes = {
      description: 'The system is currently healthy',
      isHealthy: true
    }
    let healthCheck = (req, cb) => {
      return cb(null, healthCheckRes)
    }
    app.registerHandler('healthCheck', healthCheck)
    // when
    let resSpy = sinon.spy()
    app.handle(event, context, resSpy)
    // then
    let matched = obj => {
      return obj.header.name === 'HealthCheckResponse' &&
        _.isEqual(obj.payload, healthCheckRes)
    }
    sinon.assert.calledWith(resSpy,
      null,
      sinon.match(matched)
    )
  })

  it('should return the response payload for error TargetOfflineError', () => {
    // given
    const event = events.reqDiscovery
    const context = {}
    let discover = (req, cb) => {
      let err = new Error()
      err.code = app.code.ERROR_TARGET_OFFLINE
      return cb(err)
    }
    app.registerHandler('discover', discover)
    // when
    let resSpy = sinon.spy()
    app.handle(event, context, resSpy)
    // then
    let matched = obj => {
      return obj.header.name === 'TargetOfflineError' &&
        _.isEqual(obj.payload, {})
    }
    sinon.assert.calledWith(resSpy,
      null,
      sinon.match(matched)
    )
  })
})

let expect = require('chai').expect

describe('registerHandler', () => {
  beforeEach(() => {
    app = new Alehos()
  })
  it('should refuse to register handler with non function', done => {
    expect(() => {
      app.registerHandler('key', 'not a function')
    }).to.throw(Error)
    done()
  })
  it('should register a function to its handlers list', done => {
    let hdlr = function () {}
    app.registerHandler('key', hdlr)
    expect(app.handlers['key']).to.deep.eq(hdlr)
    done()
  })
})

describe('getHlrFn', () => {
  beforeEach(() => {
    app = new Alehos()
    // provide some functions
    app.handlers = {
      discover: function discoverHlr (_req, _cb) {},
      onoff: function onoffHlr (_req, _cb) {},
      temperature: function temperatureHlr (_req, _cb) {},
      percentage: function percentageHlr (_req, _cb) {},
      healthCheck: function healthCheckHlr (_req, _cb) {},
      lock: function lockHlr (_req, _cb) {}
    }
  })

  it('should call discovery fnc from discovery event', () => {
    const event = events.reqDiscovery
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.discover)
  })

  it('should call on/off fnc from turnOn event', () => {
    const event = events.reqTurnOn
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.onoff)
  })
  it('should call on/off fnc from turnOff event', () => {
    const event = events.reqTurnOff
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.onoff)
  })

  it('should call temperature fnc from set target temperature event', () => {
    const event = events.reqSetTargetTemperature
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.temperature)
  })
  it('should call temperature fnc from inc target temperature event', () => {
    const event = events.reqIncTargetTemperature
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.temperature)
  })
  it('should call temperature fnc from dec target temperature event', () => {
    const event = events.reqDecTargetTemperature
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.temperature)
  })
  it('should call temperature fnc for get temperature reading event', () => {
    const event = events.reqGetTemperatureReading
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.temperature)
  })
  it('should call temperature fnc for get target temperature event', () => {
    const event = events.reqGetTargetTemperature
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.temperature)
  })

  it('should call percentage fnc from set percentage event', () => {
    const event = events.reqSetPercentage
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.percentage)
  })
  it('should call percentage fnc from inc percentage event', () => {
    const event = events.reqIncPercentage
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.percentage)
  })
  it('should call percentage fnc from dec percentage event', () => {
    const event = events.reqDecPercentage
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.percentage)
  })

  it('should call health check fnc from health check event', () => {
    const event = events.reqHealthCheck
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.healthCheck)
  })

  it('should call lock fnc for get lock state event', () => {
    const event = events.reqGetLockState
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.lock)
  })
  it('should call lock fnc for set lock state event', () => {
    const event = events.reqSetLockState
    expect(app._getHlrFn(event.header.name)).to.eq(app.handlers.lock)
  })
})

describe('Response header name', () => {
  let utils = require('../lib/utils')
  it('for discovery', () => {
    expect(utils.createResHeaderName('DiscoverAppliancesRequest'))
    .to.be.eq('DiscoverAppliancesResponse')
  })
  it('for turn on', () => {
    expect(utils.createResHeaderName('TurnOnRequest'))
    .to.be.eq('TurnOnConfirmation')
  })
  it('for turn off', () => {
    expect(utils.createResHeaderName('TurnOffRequest'))
    .to.be.eq('TurnOffConfirmation')
  })
  it('for get lock state', () => {
    expect(utils.createResHeaderName('GetLockStateRequest'))
    .to.be.eq('GetLockStateResponse')
  })
  it('for set lock state', () => {
    expect(utils.createResHeaderName('SetLockStateRequest'))
    .to.be.eq('SetLockStateConfirmation')
  })
  it('for get temperature reading', () => {
    expect(utils.createResHeaderName('GetTemperatureReadingRequest'))
    .to.be.eq('GetTemperatureReadingResponse')
  })
  it('for get target temperature', () => {
    expect(utils.createResHeaderName('GetTargetTemperatureRequest'))
    .to.be.eq('GetTargetTemperatureResponse')
  })
  it('for set target temperature', () => {
    expect(utils.createResHeaderName('SetTargetTemperatureRequest'))
    .to.be.eq('SetTargetTemperatureConfirmation')
  })
  it('for inc target temperature', () => {
    expect(utils.createResHeaderName('IncrementTargetTemperatureRequest'))
    .to.be.eq('IncrementTargetTemperatureConfirmation')
  })
  it('for dec target temperature', () => {
    expect(utils.createResHeaderName('DecrementTargetTemperatureRequest'))
    .to.be.eq('DecrementTargetTemperatureConfirmation')
  })
  it('for set percentage', () => {
    expect(utils.createResHeaderName('SetPercentageRequest'))
    .to.be.eq('SetPercentageConfirmation')
  })
  it('for inc percentage', () => {
    expect(utils.createResHeaderName('IncrementPercentageRequest'))
    .to.be.eq('IncrementPercentageConfirmation')
  })
  it('for dec percentage', () => {
    expect(utils.createResHeaderName('DecrementPercentageRequest'))
    .to.be.eq('DecrementPercentageConfirmation')
  })
  it('for healthcheck', () => {
    expect(utils.createResHeaderName('HealthCheckRequest'))
    .to.be.eq('HealthCheckResponse')
  })
})
