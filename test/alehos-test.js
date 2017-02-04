'use strict';

let Alehos = require('../index');
let sinon = require('sinon');
let expect = require('chai').expect;
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

    app.handler(event, context, (err, payload) => {
      expect(err).to.be.null;
      expect(payload).to.be.instanceof(Object)
        .and.has.property('header')
        .that.has.property('name', 'UnsupportedOperationError');
    });
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
      return cb(healthCheckRes);
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
});