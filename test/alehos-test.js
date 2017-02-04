'use strict';

let Alehos = require('../index');
let sinon = require('sinon');
let events = require('./events.json');
let _ = require('underscore');

let app;

describe('Alehos', () => {
  beforeEach(() => {
    app = new Alehos();
  });
  it('should return not supported for not register service yet', () => {
    const event = events.reqHealthCheck;
    const context = {};

    let cbSpy = sinon.spy();
    app.handler(event, context, cbSpy);
    let matched = sinon.match(obj => {
      return obj.header.name === 'UnsupportedOperationError';
    });
    sinon.assert.calledWith(cbSpy, null, matched);
  });

  it('should call the equivalent fuc with provided request type', () => {
    // given
    const event = events.reqHealthCheck;
    const context = {};
    app.healthCheck = sinon.spy();
    // when
    app.handler(event, context, (_err, _payload) => {});
    // then
    sinon.assert.calledWith(app.healthCheck, sinon.match.has('event', event));
  });

  it('should return the right payload from equivalent fnc', () => {
    // given
    const event = events.reqHealthCheck;
    const context = {};
    const healthCheckRes = {
      description: 'The system is currently healthy',
      isHealthy: true
    };
    // app.healthCheck = sinon.stub().yields(healthCheckRes);
    app.healthCheck = (req, cb) => {
      return cb(null, healthCheckRes);
    };
    // when
    let resSpy = sinon.spy();
    app.handler(event, context, resSpy);
    // then
    let matched = obj => {
      return obj.header.name === 'HealthCheckResponse' &&
        _.isEqual(obj.payload, healthCheckRes);
    };
    sinon.assert.calledWith(resSpy,
      null,
      sinon.match(matched)
    );
  });

  it('should return the response payload for error TargetOfflineError', () => {
    // given
    const event = events.reqDiscovery;
    const context = {};
    app.discover = (req, cb) => {
      let err = new Error();
      err.code = app.code.ERROR_TARGET_OFFLINE;
      return cb(err);
    };
    // when
    let resSpy = sinon.spy();
    app.handler(event, context, resSpy);
    // then
    let matched = obj => {
      return obj.header.name === 'TargetOfflineError' &&
        _.isEqual(obj.payload, {});
    };
    sinon.assert.calledWith(resSpy,
      null,
      sinon.match(matched)
    );
  });
});
